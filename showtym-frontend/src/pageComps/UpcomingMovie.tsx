import { MovieStore, useUpcomingMovie } from "@/store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHorizontalScroll } from "../functions/Scroll";

export default function UpcomingMovie() {
  const data = useUpcomingMovie((state) => state.data);
  const setUpcomingMovie = useUpcomingMovie((state) => state.setUpcomingMovie);
  const setAllMovies = MovieStore((state) => state.addMovies);
  const { scroll, scrollRef } = useHorizontalScroll();

  // ✅ Track both fetching and image loading
  const [fetching, setFetching] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data.length === 0) {
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/upcoming`
          );
          setUpcomingMovie(res.data);
          setAllMovies(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false); // API is done
      }
    };

    fetchData();
  }, [data, setUpcomingMovie, setAllMovies]);

  const totalImages = data.length;

  return (
    <div className="max-w-full mx-auto w-[90%]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="lg:text-2xl md:text-xl text-[1rem] font-medium">
          Premier Now
        </h1>
        <div className="flex gap-2">
          <ChevronLeft
            className="hover:scale-110 cursor-pointer"
            onClick={() => scroll(-200)}
          />
          <ChevronRight
            className="hover:scale-110 cursor-pointer"
            onClick={() => scroll(200)}
          />
        </div>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        onContextMenu={(e) => e.preventDefault()}
        className="flex gap-4 w-full mx-auto overflow-x-auto no-scrollbar pb-4 no-select"
      >
        {/* Show skeletons until API + images loaded */}
        {fetching || imagesLoaded > totalImages
          ? Array.from({ length: 6 }).map((_, id) => (
              <div
                key={id}
                className="lg:w-[300px] md:w-[200px] w-[100px] h-[450px] rounded-2xl bg-gray-300 animate-pulse"
              ></div>
            ))
          : data.map(
              (movie, id) =>
                movie.primaryImage && (
                  <img
                    src={movie.primaryImage}
                    key={id}
                    draggable={false}
                    loading="lazy"
                    onLoad={() =>
                      setImagesLoaded((prev) => prev + 1)
                    } // ✅ count loaded images
                    className="lg:w-[300px] md:w-[200px] w-[100px] h-[450px] rounded-2xl object-cover cursor-pointer transition-transform hover:scale-105"
                    onClick={() =>
                      (window.location.href = `/${movie.id}/details`)
                    }
                  />
                )
            )}
      </div>
    </div>
  );
}
