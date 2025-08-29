/*
  Warnings:

  - Added the required column `PaymentDone` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oderId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "PaymentDone" BOOLEAN NOT NULL,
ADD COLUMN     "oderId" TEXT NOT NULL;
