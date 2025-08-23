import { useIndianMovie } from "@/store/Store"
import { useEffect } from "react"
import axios from 'axios'

export default function IndianMovirs() {
   const data = useIndianMovie((state) => state.data)
    const setIndianMovie = useIndianMovie((state) => state.setIndianMovie)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(data.length === 0){
                    const fetch = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/indianmovies`)
                
                setIndianMovie(fetch.data)
                }
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [data, setIndianMovie])
    return (
        <div className="max-w-full mx-auto w-[90%]">
            <h1 className="lg:text-2xl md:text-xl  text-[1rem] font-medium mb-4">Top Indian Movies</h1>
            <div className="flex gap-4 w-full mx-auto overflow-x-auto no-scrollbar pb-4">
                {data.map((movie, id) => (
                    movie.primaryImage &&
                    <img src={movie.primaryImage} key={id} className="lg:w-[300px] md:w-[200px] w-[100px] rounded-2xl" />
                ))}
            </div>
        </div>


    )

}
