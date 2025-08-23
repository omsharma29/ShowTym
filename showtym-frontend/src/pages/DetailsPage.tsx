import { useUpcomingMovie } from "@/store/Store";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { id } = useParams(); // ✅ must match ":movieid" in the route
  const data = useUpcomingMovie((state) => state.data);

  const filterData = data.find((movie) => movie.id === id);

  type LangCode = "hi" | "te" | "en" | "bn" | "pa";

  const langMap: Record<LangCode, string> = {
    hi: "Hindi",
    te: "Telugu",
    en: "English",
    bn: "Bengali",
    pa: "Punjabi"

  };

  function getLanguage(code: LangCode): string {
    return langMap[code];
  }

  if (!filterData) return <p>Loading...</p>;

  return (
    <div className="max-w-full mx-auto w-[90%] flex flex-col gap-2 h-screen py-2">
      <div className="h-[40%] bg-red-200 flex items-center gap-2 p-2">

        {  /** image*/}
        <div className="w-1/6 h-full overflow-hidden rounded-xl">
          <img
            src={filterData.primaryImage}
            alt="movie"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="moviedetails flex flex-col">
          <h1>{filterData.originalTitle}</h1>
          <p>{getLanguage(filterData.spokenLanguages[0])}</p>
          {/**Button for view details */}

        </div>

      </div>

      <div className="h-[20%] bg-blue-200">
        datefilter
      </div>

      <div className="h-[40%] bg-green-200">
        placetime
      </div>
    </div>

  );
}
