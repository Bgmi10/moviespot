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
          '-init_seg_name init-stream$RepresentationID$.m4s',
          '-media_seg_name chunk-stream$RepresentationID$-$Number%05d$.m4s',
          
          // Video streams - 3 quality levels
          '-map 0:v:0',
          '-map 0:v:0', 
          '-map 0:v:0',
          
          // 1080p
          '-c:v:0 libx264',
          '-b:v:0 5000k',
          '-s:v:0 1920x1080',
          '-profile:v:0 high',
          
          // 720p
          '-c:v:1 libx264',
          '-b:v:1 2500k',
          '-s:v:1 1280x720',
          '-profile:v:1 main',
          
          // 480p
          '-c:v:2 libx264',
          '-b:v:2 1000k',
          '-s:v:2 854x480',
          '-profile:v:2 baseline',
          
          // Audio stream
          '-map 0:a:0',
          '-c:a aac',
          '-b:a 128k',
          '-ar 48000',
          '-ac 2',
          
          // Encoding settings
          '-preset fast',
          '-g 48',
          '-keyint_min 48',
          '-sc_threshold 0',
          
          // DASH settings
          '-window_size 5',
          '-extra_window_size 10',
          '-remove_at_exit 0',
          '-single_file 0'
        ])
        .output(`${outputDir}/manifest.mpd`)
        .on('start', (cmd) => console.log('🚀 FFmpeg command:', cmd))
        .on('progress', (progress) => {
          const percent = progress.percent || 0;
          console.log(`📈 Progress: ${Math.round(percent)}%`);
        })
        .on('end', async () => {
          console.log(`✅ DASH conversion completed for ${videoId}`);
          
          // Verify files were created
          const files = fs.readdirSync(outputDir);
          console.log(`📁 Generated files (${files.length}):`, files);
          
          // Check for init segments
          const initSegments = files.filter(f => f.startsWith('init-'));
          const chunkSegments = files.filter(f => f.startsWith('chunk-'));
          const manifestFile = files.find(f => f === 'manifest.mpd');
          
          console.log(`📊 Init segments: ${initSegments.length}`);
          console.log(`📊 Chunk segments: ${chunkSegments.length}`);
          console.log(`📊 Manifest: ${manifestFile ? 'Found' : 'Missing'}`);
          
          if (initSegments.length === 0) {
            return reject(new Error('No initialization segments created'));
          }
          
          if (!manifestFile) {
            return reject(new Error('Manifest file not created'));
          }
          
          try {
            const dashUrl = await uploadDASHToS3(outputDir, videoId);

            // Cleanup
            console.log('🧹 Cleaning up temporary files...');
            fs.rmSync(outputDir, { recursive: true, force: true });
            fs.rmSync(inputPath, { force: true });
            console.log('✅ Cleanup complete');

            resolve(dashUrl);
          } catch (uploadErr) {
            console.error('❌ Upload failed:', uploadErr);
            reject(uploadErr);
          }
        })
        .on('error', (err) => {
          console.error('❌ DASH conversion failed:', err);
          
          // Cleanup on error
          if (fs.existsSync(outputDir)) {
            fs.rmSync(outputDir, { recursive: true, force: true });
          }
          if (fs.existsSync(inputPath)) {
            fs.rmSync(inputPath, { force: true });
          }
          
          reject(err);
        })
        .run();

    } catch (err) {
      console.error('❌ Error in convertToDASH:', err);
      
      // Cleanup on error
      if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
      }
      if (fs.existsSync(inputPath)) {
        fs.rmSync(inputPath, { force: true });
      }
      
      reject(err);
    }
  });
}

async function uploadDASHToS3(localDir: string, videoId: string): Promise<string> {
  const s3Folder = `dash/${videoId}/`;
  const files = fs.readdirSync(localDir);
  console.log(`📁 Files to upload (${files.length}):`, files);

  if (files.length === 0) {
    throw new Error('No files to upload');
  }

  const uploadPromises = files.map(async (file) => {
    const filePath = path.join(localDir, file);
    const fileContent = fs.readFileSync(filePath);

    const contentType = file.endsWith('.mpd') ? 'application/dash+xml' :
                        file.endsWith('.m4s') ? 'video/iso.segment' :
                        file.endsWith('.mp4') ? 'video/mp4' :
                        'application/octet-stream';

    await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `${s3Folder}${file}`,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: file.endsWith('.mpd') ? 'max-age=60' : 'max-age=31536000'
    }).promise();

    console.log(`📤 Uploaded: ${file}`);
  });

  await Promise.all(uploadPromises);
  
  const manifestUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${s3Folder}manifest.mpd`;
  console.log(`✅ All files uploaded. Manifest URL: ${manifestUrl}`);

  return manifestUrl;
}

async function processMessage(videoId: string) {
  console.log(`🎯 Processing video: ${videoId}`);
  
  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId }
    }); 
    
    if (!video) {
      console.log(`⚠️ Video not found: ${videoId}`);
      return;
    }

    console.log(`📹 Video found: ${video.url}`);

    const dashUrl = await convertToDASH(video.url, video.id);

    await prisma.video.update({
      where: { id: videoId },
      data: {
        hlsUrl: dashUrl,
        status: "SUCCEED"
      }
    });
    
    console.log(`✅ Video processed successfully: ${videoId}`);
    console.log(`🔗 DASH URL: ${dashUrl}`);
    
  } catch (error) {
    console.error(`❌ Error processing video ${videoId}:`, error);
    
    throw error;
  }
}

async function main() {
  console.log('🚀 DASH Video Processing Worker Started');
  console.log(`📍 Queue URL: ${process.env.SQS_URL}`);
  console.log(`🪣 S3 Bucket: ${process.env.S3_BUCKET_NAME}`);
  
  while (true) {
    try {
      console.log('👂 Polling for messages...');
      
      const message = await sqs.receiveMessage({
        QueueUrl: process.env.SQS_URL as string,    
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20,
        VisibilityTimeout: 3600, // 1 hour
      }).promise();

      if (!message?.Messages || message.Messages.length === 0) {
        console.log("💤 No messages in queue");
        continue;
      }

      const sqsMessage = message.Messages[0];
      const body = sqsMessage?.Body ?? "";
      const receiptHandle = sqsMessage?.ReceiptHandle;
      
      console.log(`📨 Received message: ${body}`);
      
      try {
        const parsedBody = JSON.parse(body);
        const videoId = parsedBody?.videoId;
        
        if (!videoId) {
          console.error('❌ No videoId in message body');
          // Delete invalid message
          await sqs.deleteMessage({
            QueueUrl: process.env.SQS_URL as string,
            ReceiptHandle: receiptHandle!
          }).promise();
          continue;
        }
        
        await processMessage(videoId);
        
        // Delete message after successful processing
        console.log('🗑️ Deleting message from queue...');
        await sqs.deleteMessage({
          QueueUrl: process.env.SQS_URL as string,
          ReceiptHandle: receiptHandle!
        }).promise();
        
        console.log('✅ Message deleted from queue');
        
      } catch (processingError) {
        console.error('❌ Error processing message:', processingError);
        // Message will become visible again after VisibilityTimeout
      }
      
    } catch (error) {
      console.error('❌ Error in main loop:', error);
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

main().catch((error) => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});