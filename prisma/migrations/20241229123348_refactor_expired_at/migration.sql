/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ShortenedUrl" ADD COLUMN     "expiredAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "expiredAt";
