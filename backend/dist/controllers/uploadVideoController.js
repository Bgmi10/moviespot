import { s3, sqs } from "../config/s3.js";
import { prisma } from "../prisma/index.js";
import ffmpeg from 'fluent-ffmpeg';
import ffmpeginstaller from '@ffmpeg-installer/ffmpeg';
import ffprobeInstaller from '@ffprobe-installer/ffprobe';
ffmpeg.setFfprobePath(ffprobeInstaller.path);
ffmpeg.setFfmpegPath(ffmpeginstaller.path);
export const uploadVideo = async (req, res) => {
    const { filename, filetype } = req.query;
    try {
        // Step 1: Get signed URL for raw video upload
        const uploadUrl = await s3.getSignedUrlPromise("putObject", {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `videos/raw/${filename}`,
            ContentType: filetype,
            Expires: 300 // 5 minutes for upload
        });
        const rawVideoUrl = uploadUrl.split('?')?.[0];
        if (!rawVideoUrl)
            return;
        // Step 2: Create video record with raw URL
        const videoRecord = await prisma.video.create({
            data: {
                url: rawVideoUrl, // Original video file
            }
        });
        res.status(200).json({
            uploadUrl,
            videoId: videoRecord.id,
            message: "Upload video, then call /convert-to-hls"
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Upload failed" });
    }
};
export const convertVideoToHLS = async (req, res) => {
    const { videoId } = req.body;
    try {
        // Get video record
        const video = await prisma.video.findUnique({
            where: { id: videoId }
        });
        if (!video) {
            res.status(404).json({ error: "Video not found" });
            return;
        }
        if (video.hlsUrl) {
            res.status(400).json({ error: "Video already converted to HLS" });
            return;
        }
        try {
            const response = await sqs.sendMessage({
                QueueUrl: process.env.SQS_URL,
                MessageBody: JSON.stringify({ videoId })
            }).promise();
            console.log("📩 SQS Message Sent:", response);
        }
        catch (sqsError) {
            console.error("❌ SQS Error:", sqsError);
            return res.status(500).json({ error: "Failed to queue SQS message" });
        }
        res.status(200).json({
            message: "Queued successfully",
        });
    }
    catch (error) {
        console.error('❌ HLS conversion failed:', error);
        res.status(500).json({ error: "HLS conversion failed" });
    }
};
//# sourceMappingURL=uploadVideoController.js.map