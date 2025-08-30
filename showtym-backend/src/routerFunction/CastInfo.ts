import axios from "axios"
import { redis } from "../lib/redis.js";

export const CastInfo = async (c: any) => {
    try {
        const id = c.req.param("id")
        if (!id) return c.text("no id is given")
        const cachedData = await redis.get<string>(id);

        if (cachedData !== undefined && cachedData !== null) {
            console.log("redis is return")
            return c.json(cachedData, 200);
        }

        const fetch = await axios.get(`${c.env.CASTINFO as string}/${id}/cast`, {
            headers: {
                'x-rapidapi-key': c.env.RAPIDAPI_KEY as string,
                'x-rapidapi-host': c.env.RAPIDAPI_HOST as string,
            }
        })
        await redis.set(id, fetch.data, {
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