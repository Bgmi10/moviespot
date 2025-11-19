import { sqs } from "./config/config.js";
import { prisma } from "./prisma/index.js";
import dotenv from 'dotenv';

dotenv.config()


async function processMessage (videoId: string) {

  const video = await prisma.video.findUnique({
    where: { id: videoId }
  });

  console.log(video)

  await new Promise((res: any) => setTimeout(() => {
    res()
  }, 5000))
  // now we need extract the audio and then of available from the given video and then split the if the tamil aud is exist then we need to do three kind of res 1080, 720, 420 px and that was belongs to the tamil version and rest for the same audio too
  
}

async function main () {
    console.log('process started');
    while (1) {
        const message = await sqs.receiveMessage({
            QueueUrl: process.env.SQS_URL as string,    
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 20,
            // 10 minutes for the other workers to not pull this message else other worker will do the same thing
            VisibilityTimeout: 600,

        }).promise();
        console.log(message)
        if (message?.Messages?.length === 0) {
            console.log("no messages found in queue");
            return;
        }

        const body = message?.Messages?.[0]?.Body ?? "";
        const videoId = JSON.parse(body);
        await processMessage(videoId?.videoId);
    }
}

main()