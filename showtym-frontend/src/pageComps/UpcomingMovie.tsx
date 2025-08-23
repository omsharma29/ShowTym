import { MovieStore, useUpcomingMovie } from "@/store/Store"
import { useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";




export default function UpcomingMovie() {
    const data = useUpcomingMovie((state) => state.data)
    const setUpcomingMovie = useUpcomingMovie((state) => state.setUpcomingMovie)
    const setAllMovies = MovieStore((state) => state.addMovies)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data.length === 0) {
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/upcoming`
                    );
                    setUpcomingMovie(res.data);
                    setAllMovies(res.data)
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [data, setUpcomingMovie]);

    return (
        <div className="max-w-full mx-auto w-[90%]">
            <h1 className=" lg:text-2xl md:text-xl  text-[1rem] font-medium mb-4">Premier Now</h1>
            <div className="flex gap-4 w-full mx-auto overflow-x-auto no-scrollbar pb-4">
                {data.map((movie, id) => (
                    movie.primaryImage &&
                    <img src={movie.primaryImage} key={id} className="lg:w-[300px] md:w-[200px] w-[100px] rounded-2xl" onClick={() => {
                        window.location.href = `/${movie.id}/details`;
                    }} />
                ))}
            </div>
        </div>


    )

}
