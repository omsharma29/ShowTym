import axios from "axios"

export const CastInfo = async (c: any) => {
    try {
        const imdbId = c.req.query('imdbId')
        if(!imdbId) return c.text("no id is given")
        const fetch = await axios.get(`${process.env.CASTINFO as string}/${imdbId}/cast`, {
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
                'x-rapidapi-host': process.env.RAPIDAPI_HOST as string,
            }
        })
        return c.json(fetch.data, 200)
    } catch (error) {
        console.error('Error fetching weather data:', error)
        return c.json({
            error: 'Failed to fetch weather data',
        }, 500)
    }
}