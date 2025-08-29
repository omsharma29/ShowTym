/*
  Warnings:

  - You are about to drop the column `oderId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Booking_oderId_idx";

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "oderId",
ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Booking_orderId_idx" ON "public"."Booking"("orderId");
