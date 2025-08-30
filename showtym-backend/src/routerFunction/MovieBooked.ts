
import { getPrisma } from "../lib/prisma.js";

export const MovieBooked = async (c:any) => {
    const prisma = getPrisma();
    console.log("DB URL:", c.env.DATABASE_URL); // check if it's defined

    try {
        const body = await c.req.json()
        const newBooking = await prisma.booking.create({
            data :{
                clerkId : body.clerkId,
                email : body.email,
                movieName : body.movieName,
                movieId : body.movieId,
                City : body.City,
                Address : body.Address,
                ShowDate : body.ShowDate,
                ShowTime : body.ShowTime,
                totalSeat : body.totalSeat,
                totalPaid : body.totalPaid,
                seatNos : body.seatNos,
                orderId : body.orderId,
                PaymentDone : false
                
            }
        })

        return c.json({ success: true, newBooking }, 201);
    } catch (error) {
        console.log(error);
        return c.json({message : 'unable to book movie'}, 500)
    }
}