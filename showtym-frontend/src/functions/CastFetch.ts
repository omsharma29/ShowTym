import axios from "axios"
import { useRef } from "react";



export const Castfetch  = async(id: string | undefined)=>{
   const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/movie/${id}/cast`)
   
   console.log(res.data)
    return res.data;
}


const scrollContainerRef = useRef<HTMLDivElement>(null)

export function scroll(amount : number){
    if(scrollContainerRef.current){
        scrollContainerRef.current.scrollBy({
            left :amount,
             behavior: "smooth",
        })
    }
}