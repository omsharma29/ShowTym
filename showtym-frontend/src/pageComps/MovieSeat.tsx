import { useSeatStore } from "@/store/Store";
import Screen from "../assets/Screen.svg";



function MovieSeat({ BookedSeat }: { BookedSeat: string[] }) {
  const { selectedSeats, toggleSeat } = useSeatStore()
  console.log("Booked seats in movie seat component: ", BookedSeat);
  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Screen */}
      <div className="w-full flex justify-center">
        <img src={Screen} alt="Screen" className="w-full h-[80px]" />
      </div>

      {/* Seat Layout with horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-2 min-w-max px-4">
          {Array.from({ length: 7 }, (_, r) => {
            const rowLetter = String.fromCharCode(65 + r);

            return (
              <div key={r} className="flex justify-center gap-3" >
                {Array.from({ length: 10 }, (_, c) => {
                  const seatNumber = c + 1;
                  const seatLabel = `${rowLetter}${seatNumber}`;
                  const isSelected = selectedSeats.includes(seatLabel);
                  const isBooked = BookedSeat.includes(seatLabel)

                  return (
                    <div key={c} className="flex items-center gap-1" onClick={() => {
                      if (!isBooked) toggleSeat(seatLabel); // only allow click if not booked
                    }}>
                      <div className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer transition 
                          ${isSelected
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-black/50 hover:bg-[#98b7d0]"
                        }
                          ${isBooked ? "bg-yellow-400 cursor-not-allowed hover:bg-red-700" : ""}
                          
                          `}>
                        {seatLabel}
                      </div>

                      {/* gap after 2 and 8 */}
                      {(seatNumber === 2 || seatNumber === 8) && (
                        <div className="w-6"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-5 pb-10 flex gap-7">
        <div className="flex gap-1 items-center">
          <div className="w-5 h-5 rounded bg-yellow-400"></div>
          <p className="text-sm">Occupied</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="w-5 h-5 rounded bg-green-500"></div>
          <p className="text-sm">Selected</p>
        </div>
         <div className="flex gap-1 items-center">
          <div className="w-5 h-5 rounded bg-gray-200"></div>
          <p className="text-sm">Available</p>
        </div>
      </div>
    </div>
  );
}

export default MovieSeat;
