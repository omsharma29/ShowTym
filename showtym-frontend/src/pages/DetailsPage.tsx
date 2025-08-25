import { MovieStore, useCast, useCityStore, useDate } from "@/store/Store";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";
import { Castfetch } from "@/functions/CastFetch";
import { fetchCityData } from "@/functions/CityFetch";
import CityBox from "@/pageComps/CityBox";
import { days, showTimes } from "@/functions/ShowTime";
import { useNavigate } from "react-router-dom";

// 🔹 Put this at the top (outside your component)
{/*For language*/ }
const langMap = {
  hi: "Hindi",
  te: "Telugu",
  en: "English",
  bn: "Bengali",
  pa: "Punjabi",
} as const;

export type LangCode = keyof typeof langMap;
function getLanguage(code: LangCode): string {
  return langMap[code];
}

export default function DetailsPage() {
  const navigate = useNavigate()
  const { id } = useParams(); // ✅ must match ":movieid" in the route
  const data = MovieStore((state) => state.movies);
  const filterData = data.find((movie) => movie.id === id);
  if (!filterData) return <p>Loading...</p>;

  const { selectedCity, setSelectedCity, setCityData } = useCityStore();
  const { DateData, setDate, TimeData, setTime } = useDate()


  const handleSelect = async (city: string) => {
    setSelectedCity(city); // update trigger text
    const data = await fetchCityData(city);
    console.log(data)
    setCityData(data); // store city data in zustand
  };

  {/*For Genre*/ }
  const filtergenre = filterData.genres.map((genre: any) => {
    return " " + genre
  })

  {/*For year and month and date*/ }
  const currentYear = new Date().getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[new Date().getMonth()];

  {/*fetching cast*/ }
  const setCast = useCast((state) => state.setCast);
  const castData = useCast((state) => state.data)
  console.log(id)

  useEffect(() => {
    const fetchData = async () => {
      const res = await Castfetch(id);
      console.log("details page res: ", res)
      setCast(res ?? []);;  // ✅ update store correctly
    };
    fetchData();
  }, [id, setCast]);





  return (
    <div className="max-w-full mx-auto w-[90%] flex flex-col gap-2 h-screen py-2">
      <div className="h-auto flex flex-col md:flex-row items-start gap-4 p-4">

        {/* Image */}
        <div className="w-full md:w-[150px] lg:w-[200px] md:h-auto overflow-hidden rounded-xl">
          <img
            src={filterData.primaryImage}
            alt="movie"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Movie Details */}
        <div className="moviedetails flex flex-col flex-1 px-2 py-2 gap-2">
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {filterData.originalTitle}
          </h1>

          <p className="text-sm md:text-base">
            <span className="font-bold">Lang:</span>  {getLanguage(filterData.spokenLanguages[0] as LangCode)}
          </p>
          <p className="text-sm md:text-base">
            <span className="font-bold">Genre:</span> {filtergenre}
          </p>

          {/* Button for view details */}
          <Dialog>
            <DialogTrigger className="w-fit px-4 py-2 hover:border-black hover:border bg-blue-300 rounded-2xl text-sm md:text-base">
              View Details
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Movie Details</DialogTitle>
                <DialogDescription asChild>
                  <div>
                    {/* Movie description */}
                    <div className="desc pb-2">
                      <span className="font-semibold">Description: </span>
                      {filterData.description ? filterData.description : "No description"}
                    </div>

                    <hr className="border-t-2 border-gray-300 py-2 " />

                    {/* Cast Section */}
                    <div className="cast">
                      <h3 className="font-semibold mb-2">Casts:</h3>

                      {castData?.length ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-72 overflow-y-auto pr-2">
                          {castData
                            .filter((c: any) => c.primaryImage) // ✅ only keep those with images
                            .map((c: any, i: number) => (
                              <div
                                key={i}
                                className="flex flex-col items-center text-center space-y-2"
                              >
                                <img
                                  src={c.primaryImage}
                                  alt={c.fullName}
                                  className="w-24 h-24 object-cover rounded-full shadow-md"
                                />
                                <p className="text-sm font-medium">{c.fullName}</p>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p>No cast found</p>
                      )}
                    </div>

                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


          {/* Date and day */}
          {/* Date + Time merged box with filter aside */}
          <div className="h-[20%] p-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">
                {currentMonthName} {currentYear} {"[Select Date & Time]"}
              </div>

              {/* Filter on the right side */}
              <div className="flex items-center gap-2">
                <p className="font-semibold">Filter:</p>
                <DropdownMenu>
                  <DropdownMenuTrigger className="border-2 p-1 w-[100px] text-[0.75rem] rounded-md">
                    {selectedCity}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleSelect("Delhi")}>Delhi</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSelect("Kolkata")}>Kolkata</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSelect("Mumbai")}>Mumbai</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Date + Time grid */}
            <div
           
              className="flex flex-col gap-6 w-full bg-gray-50 rounded-xl p-4 shadow-md"
            >
              {/* Dates */}
              <div className="flex flex-wrap gap-4 justify-start items-center">
                {days.map((day, id) => {
                  
                  const isSelected = DateData?.toDateString() === day.toDateString();

                  return (
                    <div
                      key={id}
                      onClick={() => {
                        if (selectedCity === "Select Place") {
                          alert("⚠️ Please select a city first!");
                          return;
                        }
                        setDate(day); // ✅ store string
                        setTime(null);

                        console.log("Stored Date (string):", day);
                      }}
                      className={`min-w-[90px] h-16 flex flex-col items-center justify-center rounded-lg shadow cursor-pointer text-sm font-medium transition hover:scale-105 ${isSelected
                          ? "bg-[#98b7d0] text-white"
                          : "bg-white hover:bg-blue-300 hover:text-white"
                        }`}
                    >
                      <span className="text-base font-semibold">
                        {day.toLocaleDateString("en-US", { day: "numeric" })}
                      </span>
                      <span className="text-xs">
                        {day.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Times (show only if a date is selected) */}
              {DateData && (
                <div className="flex flex-wrap gap-2">
                  <span className="font-semibold">Time:</span>
                  {showTimes[DateData.getDay()]?.map((time, tIdx) => (
                    <span
                      key={tIdx}
                      onClick={() => setTime(time)}
                      className={`px-3 py-1 rounded-lg cursor-pointer transition ${TimeData === time
                        ? "bg-[#98b7d0] text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                      {time}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>




        </div>

      </div>


      <hr className="border-t-2 border-gray-300 " />


      <div className="h-[40%] flex justify-center items-center p-4">
        <CityBox />
      </div>

      <div className="flex justify-center py-10" >
        <Button className="px-10 py-5 text-xl bg-[#98b7d0] hover:bg-[#041c45]" onClick={() => {
          if (selectedCity === "Select Place" || !DateData || !TimeData) {
            alert("⚠️ Please select city, date, and time before booking!");
            return;
          } else { navigate(`/${id}/seatBook`) }

        }} >Book Now, Hurry Up!</Button>
      </div>
    </div>

  );
}
