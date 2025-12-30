/*
  Warnings:

  - You are about to drop the column `titles` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "titles",
ADD COLUMN     "title" TEXT;
