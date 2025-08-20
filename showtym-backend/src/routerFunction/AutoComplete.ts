import axios from "axios"

export const AutoComplete = async (c: any) => {
    try {
        const query = c.req.query('query') || ''
        if (!query) {
            return c.json({ error: 'Query parameter is required' }, 400)
        }
        const fetch = await axios.get(process.env.AUTO_COMPLETE as string, {
            params: { query },
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