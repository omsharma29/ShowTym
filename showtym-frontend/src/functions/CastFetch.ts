import axios from "axios"



export const Castfetch  = async(id: string | undefined)=>{
   const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/movie/${id}/cast`)
   
   console.log(res.data)
    return res.data;
}


