import { s3, sqs } from "./config/config.js";
import { prisma } from "./prisma/index.js";
import dotenv from 'dotenv';
import ffmpeg from 'fluent-ffmpeg';
import ffmpeginstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import fs from 'fs';
import path from "path";
import https from 'https';

dotenv.config();

ffmpeg.setFfprobePath(ffprobeInstaller.path);
ffmpeg.setFfmpegPath(ffmpeginstaller.path);

async function downloadVideo(url: string, localPath: string): Promise<void> {
  return new Promise((resolve: any, reject) => {
    const file = fs.createWriteStream(localPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download video. Status code: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => reject(err));
    }).on('error', (err) => reject(err));
  });
}

async function convertToDASH(inputUrl: string, videoId: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const tempDir = './tmp';
    const outputDir = `${tempDir}/${videoId}`;
    const inputPath = path.join(tempDir, `${videoId}.mp4`);
    
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    console.log(`🎬 Converting to DASH: ${videoId}`);

    try {
      // Step 1: Download S3 video locally
      console.log('⬇️ Downloading video locally...');
      await downloadVideo(inputUrl, inputPath);
      console.log('✅ Download complete');

      // Step 2: Run FFmpeg DASH conversion
      ffmpeg(inputPath)
        .outputOptions([
          '-f dash',
          '-seg_duration 10',
          '-use_template 1',
          '-use_timeline 1',
          '-map 0:v', '-map 0:v', '-map 0:v', // 3 video streams
          '-map 0:a', // audio
          '-c:v:0 libx264', '-b:v:0 5000k', '-s:v:0 1920x1080', '-profile:v:0 high',
          '-c:v:1 libx264', '-b:v:1 2500k', '-s:v:1 1280x720', '-profile:v:1 main',
          '-c:v:2 libx264', '-b:v:2 1000k', '-s:v:2 854x480', '-profile:v:2 baseline',
          '-preset ultrafast',
          '-tune zerolatency',
          '-threads 0',
          '-g 30',
          '-keyint_min 30',
          '-c:a copy',
          '-min_seg_duration 5000000',
          '-single_file 0',
          '-avoid_negative_ts make_zero'
        ])
        .output(`${outputDir}/manifest.mpd`)
        .on('start', (cmd) => console.log('🚀 FFmpeg DASH conversion started:', cmd))
        .on('progress', (progress) => console.log(`📈 Progress: ${Math.round(progress.percent || 0)}%`))
        .on('end', async () => {
          console.log(`✅ DASH conversion completed for ${videoId}`);
          
          try {
            const dashUrl = await uploadDASHToS3(outputDir, videoId);

            // Cleanup
            fs.rmSync(outputDir, { recursive: true, force: true });
            fs.rmSync(inputPath, { force: true });

            resolve(dashUrl);
          } catch (uploadErr) {
            reject(uploadErr);
          }
        })
        .on('error', (err) => {
          console.error('❌ DASH conversion failed:', err);
          reject(err);
        })
        .run();

    } catch (err) {
      reject(err);
    }
  });
}

async function uploadDASHToS3(localDir: string, videoId: string): Promise<string> {
  const s3Folder = `dash/${videoId}/`;
  const files = fs.readdirSync(localDir);
  console.log(`📁 Files to upload:`, files);

  for (const file of files) {
    const filePath = path.join(localDir, file);
    const fileContent = fs.readFileSync(filePath);

    const contentType = file.endsWith('.mpd') ? 'application/dash+xml' :
                        file.endsWith('.m4s') ? 'video/mp4' :
                        file.endsWith('.mp4') ? 'video/mp4' :
                        'application/octet-stream';

    await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `${s3Folder}${file}`,
      Body: fileContent,
      ContentType: contentType
    }).promise();

    console.log(`📤 Uploaded: ${file}`);
  }

  return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${s3Folder}manifest.mpd`;
}


async function processMessage (videoId: string) {

  const video = await prisma.video.findUnique({
    where: { id: videoId }
  }); 
  
  if (!video) {
    return;
  }

  const dashUrl = await convertToDASH(video.url, video.id);

  await prisma.video.update({
    where: { id: videoId },
    data: {
      hlsUrl: dashUrl,
      status: "SUCCEED"
    }
  })
   
}

async function main () {
  console.log('process started');
  while (1) {
    const message = await sqs.receiveMessage({
      QueueUrl: process.env.SQS_URL as string,    
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 20,
      // 10 minutes for the other workers to not pull this message else other worker will do the same thing
      VisibilityTimeout: 3600,
    }).promise();

    if (message?.Messages?.length === 0) {
      console.log("no messages found in queue");
      continue;
    }
    const body = message?.Messages?.[0]?.Body ?? "";
    const videoId = JSON.parse(body);
    await processMessage(videoId?.videoId);
    
    sqs.deleteMessage({
      QueueUrl: process.env.SQS_URL as string,
      ReceiptHandle: message.Messages?.[0]?.ReceiptHandle!
    }).promise()
  }
}

main()