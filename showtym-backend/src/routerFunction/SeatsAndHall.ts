
type City = {
  name: string;
  movieHall: {
    name: string;
    address: string;
    pricePerSeat: number;
    features: string[];

  };
};

// helper to generate random filled seats

// 🎬 Final cityData
let cityData: City[] = [
  {
    name: "Delhi",
    movieHall: {
      name: "PVR Anupam Saket",
      address: "Community Centre, Saket, New Delhi",
      pricePerSeat: 400,
      features: ["Dolby Atmos", "Recliner Seats", "4K Screen"],
      
    },
  },
  {
    name: "Mumbai",
    movieHall: {
      name: "INOX R City Mall",
      address: "R City Mall, Ghatkopar West, Mumbai",
      pricePerSeat: 400,
      features: ["Dolby Digital", "Luxury Recliners", "3D Experience"],
      
    },
  },
  {
    name: "Kolkata",
    movieHall: {
      name: "PVR Mani Square Mall",
      address: "Mani Square Mall, Kankurgachi, Kolkata",
      pricePerSeat: 400,
      features: ["Dolby Atmos", "Recliners", "Large IMAX Screen"],
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