import { Cashfree, CFEnvironment } from "cashfree-pg";
import prisma from "../lib/prisma.js";

// Initialize Cashfree instance
const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,                   // Change to PRODUCTION in production
    process.env.APP_ID as string,
    process.env.SECRET_KEY as string
);




export const verify = async (c: any) => {
    try {
        const body = await c.req.json();
        const orderId = body.oderId; // just extract the string

        // Destructure them




        const response = await cashfree.PGFetchOrder(orderId);



        if (!response || !response.data) {
            throw new Error("No response from Cashfree");
        }

        // Extract relevant payment details
        const {
            order_status,
        } = response.data;

        if (order_status === 'PAID') {
            await prisma.booking.updateMany({
                where: { oderId: orderId },
                data: { PaymentDone: true }
            })
        } else {
            return c.json({ message: "your payment is pending " }, 400)
        }


        const booking = await prisma.booking.findMany({
            where: { oderId: orderId }, // 👈 ensure your Booking model has "orderId" field
            select: {
                oderId: true,
                email: true,
                movieName: true,
                totalPaid: true,
                totalSeat: true,
                seatNos: true,
                bookingDate: true,
                ShowDate: true,
                ShowTime: true,
                City: true,
                Address: true,
                PaymentDone: true,
            }
        })

        return c.json({
            success: true,
            order_status: order_status,        // full order details from Cashfree
            booking: booking,    // booking + user details from DB
        })

    } catch (err: any) {
        console.error("Payment verification error:", err.response?.data || err);
        return c.json({
            success: false,
            error: true,
            message: err.response?.data?.message || err.message,
            code: err.response?.data?.code || 'verification_failed'
        }, 500);
    }
};