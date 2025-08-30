import axios from "axios"
import { redis } from "../lib/redis.js";

export const upcomingIndianMovies = async (c: any) => {
  try {

    //checking if data exist or not in redis 
    const cachedData = await redis.get<string>("cachedkey");

    if (cachedData !== undefined && cachedData !== null) {
      console.log("redis is return")
      return c.json(cachedData, 200);
    }

    const fetch = await axios.get(c.env.INDIAN_UPCOMING as string, {
      headers: {
        'x-rapidapi-key': c.env.RAPIDAPI_KEY as string,
        'x-rapidapi-host': c.env.RAPIDAPI_HOST as string,
      }
    })

    await redis.set("cachedkey", fetch.data, {
      ex: 3600
    })
    console.log("Serving from API");
    return c.json(fetch.data, 200)
  } catch (error) {
    console.error('Error fetching Movies data:', error)
    return c.json({
      error: 'Failed to fetch movies data',
    }, 500)
  }
}