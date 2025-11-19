import express from "express";
import { s3 } from "../config/s3.js";
import { prisma } from "../prisma/index.js";

export const uploadVideo = async (req: express.Request, res: express.Response) => {
  const { filename, filetype } = req.query;

  try{
    const url =  await s3.getSignedUrlPromise("putObject", {
     Bucket: process.env.S3_BUCKET_NAME,
     Key: `videos/${filename}`,
     ContentType: filetype,
     Expires: 60
    }); 
    const actualS3Url = url.split('?')?.[0];

    if (actualS3Url) {
      await prisma.video.create({
        data: {
          url: actualS3Url,
        }
      })
    };

    res.status(200).json({ url })
  } catch (e) {
    console.log(e)
  }
} 