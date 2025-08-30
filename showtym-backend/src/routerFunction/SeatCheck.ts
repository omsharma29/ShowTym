import { getPrisma} from "../lib/prisma.js";


export const SeatCheck = async (c: any) => {
        const prisma = getPrisma();
    
    try {
        const body = await c.req.json();
        const { movieID, city, showDate, showTime } = body;
        console.log("SeatCheck body:", body);

        if (!movieID || !city || !showDate || !showTime) {
            return c.json({ message: "All fields are required" }, 400)
        }

        const startOfDay = new Date(showDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(showDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const findBookedSeats = await prisma.booking.findMany({
            where: {
                movieId: movieID,
                City: city,
                ShowDate: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                ShowTime: showTime,
                PaymentDone: true
            },
            select: {
                seatNos: true
            }
        });

        if (!findBookedSeats) {
            return c.json({ message: "no seats" })
        }
        return c.json({ bookedSeats: findBookedSeats }, 200)

    } catch (error) {
        console.error("error is seat checking", error)
    }
}