import cron from "node-cron";
import { prisma } from "../prisma/index.js";
import { sqs } from "../config/s3.js";

export const queuePendingJobsCron = () => {
    cron.schedule('* * * * *', async () => {
       const videos = await prisma.video.findMany({
        where: { status: "PENDING" }
       });
       
        for (const video of videos) {
            await sqs.sendMessage({
                QueueUrl: process.env.SQS_URL as string,
                MessageBody: JSON.stringify({ videoId: video.id })
            }).promise()

            await prisma.video.updateMany({
                where: {
                  id: { in: videos.map(v => v.id) }
                },
                data: {
                  status: "QUEUED"
                }
            });
        }
        console.log("processed")
    })
}