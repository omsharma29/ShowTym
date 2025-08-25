import MovieSeat from "@/pageComps/MovieSeat";
import { MovieStore, useCityStore, useDate } from "@/store/Store";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SeatBook() {
  const { cityData } = useCityStore();
  const { DateData, TimeData } = useDate();
  const { id } = useParams();
  const data = MovieStore((state) => state.movies);
  const filterData = data.find((movie) => movie.id === id);

  return (
    <div className="max-w-full mx-auto flex justify-center p-5 items-center flex-col gap-6">
      {/* Venue Card - responsive width */}
      <div className="venue w-full sm:w-3/4 lg:w-1/2">
        <Card className="hover:scale-105 transition">
          <CardContent className="p-4">
            <h1 className="text-lg font-bold">Booking:</h1>
            <p className="Movie text-xl font-semibold">
              {filterData?.originalTitle}
            </p>
            <p className="venue text-sm">
              Venue:{" "}
              <span>{cityData?.movieHall?.name ?? "Unknown Venue"}</span>,{" "}
              {cityData?.movieHall?.address ?? "No Address"}, on {DateData?.toDateString()} at {TimeData}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Movie Seat Section (scrolls on small screens) */}
      <div className="seat w-full sm:w-3/4 lg:w-1/2">
        <MovieSeat />
      </div>

      {/* Sticky Pay Now Button */}
      <div className="ButtonBuyNow fixed bottom-0 w-full rounded-t-lg border-t h-[60px] bg-white shadow-2xl flex justify-center items-center">
        <Button>Pay Now</Button>
      </div>
    </div>
  );
}
