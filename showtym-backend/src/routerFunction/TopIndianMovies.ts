import axios from "axios"
import { redis } from "../lib/redis.js";

export const TopIndianMovies = async(c: any)=>{
     try {

      const cachedData = await redis.get<string>("USAmovies");
        
            if (cachedData !== undefined && cachedData !== null) {
              console.log("redis is return")
              return c.json(cachedData, 200);
            }
  
    const fetch = await axios.get(process.env.TOP_INDIAN_MOVIES as string, {
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
        'x-rapidapi-host': process.env.RAPIDAPI_HOST as string,
      }
    })

     await redis.set("cachedkey", fetch.data, {
          ex: 3600
        })
        console.log("Serving from API");
    return c.json(fetch.data, 200)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return c.json({
      error: 'Failed to fetch weather data',
    }, 500)
  }
}