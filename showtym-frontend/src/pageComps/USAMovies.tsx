import { MovieStore, useUsaMovie } from "@/store/Store"
import { useEffect } from "react"
import axios from 'axios'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useHorizontalScroll } from "@/functions/Scroll"

export default function USAMovies() {
    const data = useUsaMovie((state) => state.data)
    const setUsaMovie = useUsaMovie((state) => state.setUsaMovie)
    const setAllMovies = MovieStore((state) => state.addMovies)
    const { scroll, scrollRef } = useHorizontalScroll()


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data.length === 0) {
                    const fetch = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/usmovies`)
                    console.log(fetch.data)
                    setUsaMovie(fetch.data)
                    setAllMovies(fetch.data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [data, setUsaMovie])
    return (
        <div className="max-w-full mx-auto w-[90%]">
            <div className="flex justify-between items-center mb-4">
                <h1 className="lg:text-2xl md:text-xl text-[1rem] font-medium">Premier Now</h1>
                <div className="flex gap-2">
                    <ChevronLeft className="hover:scale-110 cursor-pointer" onClick={() => scroll(-200)} />
                    <ChevronRight className="hover:scale-110 cursor-pointer" onClick={() => scroll(200)} />
                </div>
            </div>
            <div ref={scrollRef} // ✅ attach ref here
                onContextMenu={(e) => e.preventDefault()} className="flex gap-4 w-full mx-auto overflow-x-auto no-scrollbar pb-4">
                {data.map((movie, id) => (
                    movie.primaryImage &&
                    <img src={movie.primaryImage} key={id} draggable={false} className="lg:w-[300px] hover:scale-103 md:w-[200px] w-[100px] rounded-2xl" onClick={() => {
                        window.location.href = `/${movie.id}/details`;
                    }} />
                ))}
            </div>
        </div>


    )
}
