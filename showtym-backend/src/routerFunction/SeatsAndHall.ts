type MovieHall = {
    name: string;
    address: string;
    seats: number;
    pricePerSeat: number;
    features: string[];
    filledSeats: number[];
};

type City = {
    name: string;
    movieHall: MovieHall;
};

let cityData: City[] = [
    {
        name: "Delhi",
        movieHall: {
            name: "PVR Anupam Saket",
            address: "Community Centre, Saket, New Delhi",
            seats: 100,
            pricePerSeat: 400,
            features: ["Dolby Atmos", "Recliner Seats", "4K Screen"],
            filledSeats: [5, 12, 20, 33, 50], // random pre-filled
        },
    },
    {
        name: "Mumbai",
        movieHall: {
            name: "INOX R City Mall",
            address: "R City Mall, Ghatkopar West, Mumbai",
            seats: 100,
            pricePerSeat: 400,
            features: ["Dolby Digital", "Luxury Recliners", "3D Experience"],
            filledSeats: [2, 7, 15, 40, 60, 75], // random pre-filled
        },
    },
    {
        name: "Kolkata",
        movieHall: {
            name: "PVR Mani Square Mall",
            address: "Mani Square Mall, Kankurgachi, Kolkata",
            seats: 100,
            pricePerSeat: 400,
            features: ["Dolby Atmos", "Recliners", "Large IMAX Screen"],
            filledSeats: [1, 6, 10, 25, 45, 80], // random pre-filled
        },
    },
];


export const getCityHall = async (c: any) => {
    try {
        const cityName = c.req.param("cityName");
        const city = cityData.find(
            (ct) => ct.name.toLowerCase() === cityName.toLowerCase()
        );

        if (!city) {
            return c.json({ error: "City not found" }, 404);
        }

        return c.json(city);
    } catch (error) {
        console.error(error);
        return c.json({message : error})
    }
}