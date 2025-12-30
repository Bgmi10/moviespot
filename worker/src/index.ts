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

interface VideoMetadata {
  hasVideo: boolean;
  hasAudio: boolean;
  width: number;
  height: number;
  duration: number;
  aspectRatio: number;
  codec: string;
  audioCodec: string | undefined;
}

async function getVideoMetadata(filePath: string): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        console.error('❌ Error probing video:', err);
        reject(err);
        return;
      }

      const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
      const audioStream = metadata.streams.find(stream => stream.codec_type === 'audio');

      if (!videoStream) {
        reject(new Error('No video stream found in file'));
        return;
      }

      const width = videoStream.width || 0;
      const height = videoStream.height || 0;
      const duration = parseFloat(String(metadata.format.duration || 0));

      console.log(`📊 Video metadata: ${width}x${height}, duration: ${duration}s, codec: ${videoStream.codec_name}`);

      resolve({
        hasVideo: !!videoStream,
        hasAudio: !!audioStream,
        width,
        height,
        duration,
        aspectRatio: width / height,
        codec: videoStream.codec_name || 'unknown',
        audioCodec: audioStream?.codec_name || undefined
      });
    });
  });
}

function calculateOptimalResolutions(originalWidth: number, originalHeight: number): Array<{width: number, height: number, bitrate: string}> {
  const aspectRatio = originalWidth / originalHeight;
  const resolutions = [];

  // Target 3 resolutions: 1080p, 720p, 480p
  const targetHeights = [1080, 720, 480];
  
  for (const targetHeight of targetHeights) {
    if (targetHeight > originalHeight) continue;
    
    const targetWidth = Math.round(targetHeight * aspectRatio);
    
    // Ensure even dimensions for x264 compatibility
    const adjustedWidth = targetWidth % 2 === 0 ? targetWidth : targetWidth - 1;
    const adjustedHeight = targetHeight % 2 === 0 ? targetHeight : targetHeight - 1;
    
    let bitrate: string;
    if (adjustedHeight >= 1080) bitrate = '5000k';
    else if (adjustedHeight >= 720) bitrate = '2500k';
    else if (adjustedHeight >= 480) bitrate = '1200k';
    else bitrate = '800k';
    
    resolutions.push({
      width: adjustedWidth,
      height: adjustedHeight,
      bitrate
    });
  }

  // Ensure at least one resolution
  if (resolutions.length === 0) {
    const adjustedWidth = originalWidth % 2 === 0 ? originalWidth : originalWidth - 1;
    const adjustedHeight = originalHeight % 2 === 0 ? originalHeight : originalHeight - 1;
    resolutions.push({
      width: adjustedWidth,
      height: adjustedHeight,
      bitrate: '1200k'
    });
  }

  return resolutions;
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

      // Step 2: Get video metadata
      console.log('🔍 Analyzing video metadata...');
      const metadata = await getVideoMetadata(inputPath);
      
      if (metadata.duration < 1) {
        throw new Error('Video duration too short or invalid');
      }

      // Step 3: Calculate optimal resolutions
      const resolutions = calculateOptimalResolutions(metadata.width, metadata.height);
      console.log(`📐 Target resolutions:`, resolutions);

      // Step 4: Build FFmpeg command dynamically for speed and long videos
      const outputOptions = [
        '-f dash',
        '-seg_duration 6',
        '-use_template 1',
        '-use_timeline 1',
        '-preset veryfast',
        '-threads 0',
        '-g 30',
        '-keyint_min 30',
        '-min_seg_duration 3000000',
        '-single_file 0',
        '-avoid_negative_ts make_zero',
        '-movflags +faststart',
        '-max_muxing_queue_size 1024'
      ];

      // Add video stream mappings and encoding options
      resolutions.forEach((_, index) => {
        outputOptions.push(`-map 0:v`);
      });

      // Add audio mapping if audio exists
      if (metadata.hasAudio) {
        outputOptions.push('-map 0:a');
      }

      // Add video encoding options for each resolution
      resolutions.forEach((res, index) => {
        outputOptions.push(
          `-c:v:${index} libx264`,
          `-b:v:${index} ${res.bitrate}`,
          `-s:v:${index} ${res.width}x${res.height}`,
          `-profile:v:${index} baseline`,
          `-crf:v:${index} 28`,
          `-maxrate:v:${index} ${res.bitrate}`,
          `-bufsize:v:${index} ${parseInt(res.bitrate) * 2}k`
        );
      });

      // Add audio encoding options if audio exists
      if (metadata.hasAudio) {
        if (metadata.audioCodec === 'aac' || metadata.audioCodec === 'mp3') {
          outputOptions.push('-c:a copy');
        } else {
          outputOptions.push('-c:a aac', '-b:a 96k', '-ac 2');
        }
      }

      console.log('🔧 FFmpeg options:', outputOptions);

      // Step 5: Run FFmpeg DASH conversion
      ffmpeg(inputPath)
        .outputOptions(outputOptions)
        .output(`${outputDir}/manifest.mpd`)
        .on('start', (cmd) => console.log('🚀 FFmpeg DASH conversion started'))
        .on('progress', (progress) => {
          const percent = Math.round(progress.percent || 0);
          if (percent % 5 === 0) {
            console.log(`📈 Progress: ${percent}%`);
          }
        })
        .on('end', async () => {
          console.log(`✅ DASH conversion completed for ${videoId}`);
          
          try {
            const dashUrl = await uploadDASHToS3(outputDir, videoId);

            // Cleanup
            console.log('🧹 Cleaning up temporary files...');
            if (fs.existsSync(outputDir)) {
              fs.rmSync(outputDir, { recursive: true, force: true });
            }
            if (fs.existsSync(inputPath)) {
              fs.rmSync(inputPath, { force: true });
            }

            resolve(dashUrl);
          } catch (uploadErr) {
            console.error('❌ S3 upload failed:', uploadErr);
            reject(uploadErr);
          }
        })
        .on('error', (err) => {
          console.error('❌ DASH conversion failed:', err);
          console.error('Video metadata:', metadata);
          console.error('FFmpeg options used:', outputOptions);
          
          // Cleanup on error
          try {
            if (fs.existsSync(outputDir)) {
              fs.rmSync(outputDir, { recursive: true, force: true });
            }
            if (fs.existsSync(inputPath)) {
              fs.rmSync(inputPath, { force: true });
            }
          } catch (cleanupErr) {
            console.error('❌ Cleanup failed:', cleanupErr);
          }
          
          reject(err);
        })
        .run();

    } catch (err) {
      console.error('❌ Pre-conversion error:', err);
      
      // Cleanup on error
      try {
        if (fs.existsSync(outputDir)) {
          fs.rmSync(outputDir, { recursive: true, force: true });
        }
        if (fs.existsSync(inputPath)) {
          fs.rmSync(inputPath, { force: true });
        }
      } catch (cleanupErr) {
        console.error('❌ Cleanup failed:', cleanupErr);
      }
      
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