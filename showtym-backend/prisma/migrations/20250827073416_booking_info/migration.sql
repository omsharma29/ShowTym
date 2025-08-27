/*
  Warnings:

  - Added the required column `movieId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "movieId" TEXT NOT NULL,
ADD COLUMN     "seatNos" TEXT[];
