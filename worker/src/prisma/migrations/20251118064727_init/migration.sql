-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('PENDING', 'QUEUED', 'SUCCEED');

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "status" "VideoStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
