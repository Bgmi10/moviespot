import { s3, sqs } from "./config/config.js";
import { prisma } from "./prisma/index.js";
import dotenv from 'dotenv';
import ffmpeg from 'fluent-ffmpeg';
import ffmpeginstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
import fs from 'fs';
import path from "path";
dotenv.config();
ffmpeg.setFfprobePath(ffprobeInstaller.path);
ffmpeg.setFfmpegPath(ffmpeginstaller.path);
// function createVideoVarient (url: string, resolution: string, videoId: string) {
//   return new Promise((res, rej) => {
//     const resolutionSettings: any = {
//       '1080p': { width: 1920, height: 1080, bitrate: '5000k' },
//       '720p': { width: 1280, height: 720, bitrate: '2500k' },
//       '480p': { width: 854, height: 480, bitrate: '1000k' }
//     };
//     const setting = resolutionSettings[resolution];
//     // Create temp directory if it doesn't exist
//     const tempDir = './tmp';
//     if (!fs.existsSync(tempDir)) {
//       fs.mkdirSync(tempDir, { recursive: true });
//     }
//     const op = `${tempDir}/${videoId}_${resolution}.mp4`;
//     ffmpeg(url)
//         .videoCodec('libx264')
//         .audioCodec('copy') // Copy original audio without re-encoding
//         .videoFilters(`scale=${setting.width}:${setting.height}:force_original_aspect_ratio=decrease,pad=${setting.width}:${setting.height}:(ow-iw)/2:(oh-ih)/2`)
//         .outputOptions([
//           '-preset ultrafast', // Fastest encoding
//           '-movflags +faststart',
//           '-avoid_negative_ts make_zero'
//         ])
//         .format('mp4')
//         .output(op)
//         .on('start', (commandLine) => {
//           console.log(`FFmpeg started for ${resolution}`);
//           console.log('Command:', commandLine);
//         })
//         .on('progress', (progress) => {
//           console.log(`${resolution} progress: ${Math.round(progress.percent || 0)}%`);
//         })
//         .on('end', () => {
//           console.log(`✅ ${resolution} encoding completed: ${op}`);
//           // Check if file exists and has size > 0
//           if (fs.existsSync(op) && fs.statSync(op).size > 0) {
//             console.log(`File size: ${fs.statSync(op).size} bytes`);
//             res(op);
//           } else {
//             console.log(`❌ Output file is empty or doesn't exist`);
//             rej(new Error('Output file is empty or corrupted'));
//           }
//         })
//         .on('error', (err) => {
//           console.log(`❌ ${resolution} encoding failed:`, err.message);
//           rej(err);
//         })
//         .run();
//     });
// }
// async function processVideoResolutions (url: string, targetResolutions: string[], videoId: string) {
//   for (const resolution of targetResolutions) {
//     console.log('starting encoding....');
//     await createVideoVarient(url, resolution, videoId)
//   }
//   // we need to delete an id from the queue
// }
async function convertToDASH(inputUrl, videoId) {
    return new Promise((resolve, reject) => {
        const tempDir = './tmp';
        const outputDir = `${tempDir}/${videoId}`;
        // Create output directory
        if (!fs.existsSync(tempDir))
            fs.mkdirSync(tempDir, { recursive: true });
        if (!fs.existsSync(outputDir))
            fs.mkdirSync(outputDir, { recursive: true });
        console.log(`🎬 Converting to DASH: ${videoId}`);
        ffmpeg(inputUrl)
            .outputOptions([
            // DASH format
            '-f dash',
            '-seg_duration 10',
            '-use_template 1',
            '-use_timeline 1',
            // Create multiple video streams (1080p, 720p, 480p)
            '-map 0:v', '-map 0:v', '-map 0:v', // 3 video streams
            '-map 0:a', // All audio streams
            // Video encoding for stream 0 (1080p)
            '-c:v:0 libx264', '-b:v:0 5000k', '-s:v:0 1920x1080', '-profile:v:0 high',
            // Video encoding for stream 1 (720p)  
            '-c:v:1 libx264', '-b:v:1 2500k', '-s:v:1 1280x720', '-profile:v:1 main',
            // Video encoding for stream 2 (480p)
            '-c:v:2 libx264', '-b:v:2 1000k', '-s:v:2 854x480', '-profile:v:2 baseline',
            // Speed optimizations
            '-preset ultrafast',
            '-tune zerolatency',
            '-threads 0',
            '-g 30',
            '-keyint_min 30',
            // Keep original audio (all languages preserved)
            '-c:a copy',
            // DASH specific options  
            '-min_seg_duration 5000000',
            '-single_file 0',
            '-avoid_negative_ts make_zero'
        ])
            .output(`${outputDir}/manifest.mpd`)
            .on('start', (commandLine) => {
            console.log('🚀 FFmpeg DASH conversion started');
            console.log('Command:', commandLine);
        })
            .on('progress', (progress) => {
            console.log(`📈 DASH conversion progress: ${Math.round(progress.percent || 0)}%`);
        })
            .on('end', async () => {
            console.log(`✅ DASH conversion completed for ${videoId}`);
            try {
                // Upload all DASH files to S3
                const dashUrl = await uploadDASHToS3(outputDir, videoId);
                // Clean up temp files
                fs.rmSync(outputDir, { recursive: true, force: true });
                resolve(dashUrl);
            }
            catch (error) {
                reject(error);
            }
        })
            .on('error', (err) => {
            console.error('❌ DASH conversion failed:', err);
            reject(err);
        })
            .run();
        ``;
    });
}
async function uploadDASHToS3(localDir, videoId) {
    const s3Folder = `dash/${videoId}/`;
    // Get all files in the DASH output directory
    const files = fs.readdirSync(localDir);
    console.log(`📁 Files to upload:`, files);
    // Upload each file to S3
    for (const file of files) {
        const filePath = path.join(localDir, file);
        const fileContent = fs.readFileSync(filePath);
        const contentType = file.endsWith('.mpd') ? 'application/dash+xml' :
            file.endsWith('.m4s') ? 'video/mp4' :
                file.endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream';
        await s3.upload({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${s3Folder}${file}`,
            Body: fileContent,
            ContentType: contentType
        }).promise();
        console.log(`📤 Uploaded: ${file}`);
    }
    // Return the manifest URL
    return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${s3Folder}manifest.mpd`;
}
async function processMessage(videoId) {
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
    });
}
async function main() {
    console.log('process started');
    while (1) {
        const message = await sqs.receiveMessage({
            QueueUrl: process.env.SQS_URL,
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
            QueueUrl: process.env.SQS_URL,
            ReceiptHandle: message.Messages?.[0]?.ReceiptHandle
        }).promise();
    }
}
main();
//# sourceMappingURL=index.js.map