
import prisma from "../lib/prisma.js"; // your prisma client

export const MovieBooked = async (c:any) => {
    try {
        const body = await c.req.json()
        const newBooking = await prisma.booking.create({
            data :{
                clerkId : body.clerkId,
                email : body.email,
                movieName : body.movieName,
                movieId : body.movieId,
                City : body.city,
                Address : body.Address,
                ShowDate : body.ShowDate,
                ShowTime : body.ShowTime,
                totalSeat : body.totalSeat,
                totalPaid : body.totalPaid,
                seatNos : body.seatNos,
                
            }
        })

        return c.json({ success: true, newBooking }, 201);
    } catch (error) {
        console.log(error);
        return c.json({message : 'unable to book movie'}, 500)
    }
}