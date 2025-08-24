import { MovieStore, useIndianMovie } from "@/store/Store"
import { useEffect } from "react"
import axios from 'axios'
import { useHorizontalScroll } from "@/functions/Scroll"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function IndianMovirs() {
    const data = useIndianMovie((state) => state.data)
    const setIndianMovie = useIndianMovie((state) => state.setIndianMovie)
    const setAllMovies = MovieStore((state) => state.addMovies)
    const { scroll, scrollRef } = useHorizontalScroll()


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data.length === 0) {
                    const fetch = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/indianmovies`)

                    setIndianMovie(fetch.data)
                    setAllMovies(fetch.data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [data, setIndianMovie])
    return (
        <div className="max-w-full mx-auto w-[90%]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="lg:text-2xl md:text-xl text-[1rem] font-medium">Top Indian Movies</h1>
                <div className="flex gap-2">
                    <ChevronLeft className="hover:scale-110 cursor-pointer" onClick={() => scroll(-200)} />
                    <ChevronRight className="hover:scale-110 cursor-pointer" onClick={() => scroll(200)} />
                </div>
            </div>
            <div
                ref={scrollRef} // ✅ attach ref here
                onContextMenu={(e) => e.preventDefault()}
                className="flex gap-4 w-full mx-auto overflow-x-auto no-scrollbar pb-4">
                {data.map((movie, id) => (
                    movie.primaryImage &&
                    <img src={movie.primaryImage} key={id} draggable={false} className="lg:w-[300px] md:w-[200px] w-[100px] rounded-2xl" onClick={() => {
                        window.location.href = `/${movie.id}/details`;
                    }} />
                ))}
            </div>
        </div>


    )

}
