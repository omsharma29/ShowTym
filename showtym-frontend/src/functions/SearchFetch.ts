import axios from "axios"

export const SearchFetch = async(query : string) =>{
    const fetch = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/search`,{
        params:{query}
    })
    return fetch.data;
}