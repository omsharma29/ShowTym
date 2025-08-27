-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "movieName" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ShowDate" TIMESTAMP(3) NOT NULL,
    "ShowTime" TEXT NOT NULL,
    "totalPaid" DOUBLE PRECISION NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_clerkId_idx" ON "public"."Booking"("clerkId");

-- CreateIndex
CREATE INDEX "Booking_email_idx" ON "public"."Booking"("email");
