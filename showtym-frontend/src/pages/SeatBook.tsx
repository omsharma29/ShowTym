import MovieSeat from "@/pageComps/MovieSeat";
import { MovieStore, useCityStore, useDate, useSeatStore } from "@/store/Store";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // or @clerk/nextjs
import axios from "axios";


export default function SeatBook() {
  const { cityData, selectedCity } = useCityStore();
  const { DateData, TimeData } = useDate();
  const { id } = useParams();
  const data = MovieStore((state) => state.movies);
  const filterData = data.find((movie) => movie.id === id);
  const navigate = useNavigate(); // 👈 add this
  const { selectedSeats } = useSeatStore()
  const totalSeat = selectedSeats.length
  const totalPrice = cityData?.movieHall?.pricePerSeat * totalSeat
  const { user } = useUser();

  console.log("Selected city:", selectedCity);
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (totalSeat === 0) {
      alert("Please select at least one seat to proceed with payment.")
    }
    if (cityData === null || DateData === null || TimeData === null) {
      alert("Some data is missing like city, dates, time, please go back and select again.")
    }
    const bookingDetails = {
      clerkId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
      movieName: filterData?.originalTitle,
      movieId: filterData?.id,    
      City: selectedCity,
      Address: cityData.movieHall.address,
      ShowDate: DateData,
      ShowTime: TimeData,
      totalSeat: totalSeat,
      totalPaid: totalPrice,
      seatNos: selectedSeats
    }
    

    try {
      const putData = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/booking`, bookingDetails)

      if (putData.status === 201) {
        alert("Booking successful! Check your email for details.")
        console.log("Booking successful");
        console.log(putData.data);
      }
    } catch (error) {
      console.error("error in booking:", error);
      alert("error in booking, please try again")
    }

  }

  useEffect(() => {
    if (!cityData || !DateData || !TimeData) {
      navigate(-1); // 👈 go back
    }
  }, [cityData, DateData, TimeData, navigate]);

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
              {cityData?.movieHall?.address ?? "No Address"}, on{" "}
              <strong>
                {DateData
                  ? new Date(DateData).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short"
                  })
                  : "No Date"}
              </strong>{" "}
              at <strong>{TimeData ?? "No Time"}</strong>
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
        <Button onClick={handleClick}>Pay Now :- &#8377; {totalPrice}</Button>
      </div>
    </div>
  );
}
