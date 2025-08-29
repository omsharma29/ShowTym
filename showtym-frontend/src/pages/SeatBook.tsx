import MovieSeat from "@/pageComps/MovieSeat";
import { MovieStore, useCityStore, useDate, useSeatStore } from "@/store/Store";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react"; // or @clerk/nextjs
import axios from "axios";
import { sessionId } from "@/functions/CashFreeSessionID";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";



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
    else if (cityData === null || DateData === null || TimeData === null) {
      alert("Some data is missing like city, dates, time, please go back and select again.")
    } else {
      //call payment api if payment get sucess then i push data into databse



      if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
        alert("Please make sure you are logged in with a valid email address.");
        return;
      }

      // save the booking details to the databse




      // payment gateway integration
      const OrderDetails = {
        order_amount: totalPrice,
        customer_id: user.id,
        customer_email: user.primaryEmailAddress.emailAddress,
      }
      try {
        console.log("Initiating payment with details:", OrderDetails);
        const SessionResponse = await sessionId(OrderDetails);
        console.log("Payment Session Response:", SessionResponse.payment_session_id, SessionResponse.order_id);

        if (!SessionResponse.payment_session_id || !SessionResponse.order_id) {
          throw new Error("No payment session ID received");
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
          seatNos: selectedSeats,
          orderId: SessionResponse.order_id,
        }

        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/booking`, bookingDetails)



        const paymentSessionId = SessionResponse.payment_session_id;
        try {
          let cashFree: any = await load({
            mode: "sandbox" // Change to "production" when going live
          });
          let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self",
          };
          await cashFree.checkout(checkoutOptions);
        } catch (error) {
          console.error("CashFree SDK error:", error);
          alert("Failed to initialize payment. Please try again.");
        }
      } catch (error: any) {
        console.error("Payment initiation error:", error);
        alert(error.response?.data?.message || "Failed to start payment. Please try again.");
      }

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
