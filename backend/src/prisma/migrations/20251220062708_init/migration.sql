-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('MOVIE', 'SERIE');

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL DEFAULT 'MOVIE',
    "titles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
