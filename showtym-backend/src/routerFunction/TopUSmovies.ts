import axios from "axios"

export const TopUSAmovies = async(c: any)=>{
     try {
  
    const fetch = await axios.get(process.env.TOP_US_MOVIES as string, {
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