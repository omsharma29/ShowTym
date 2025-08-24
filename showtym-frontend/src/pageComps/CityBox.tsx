import { useCityStore } from "@/store/Store";

export default function CityBox() {
  const { cityData } = useCityStore();

  if (!cityData) {
    return (
      <div className="h-[40%] flex justify-center items-center">
        <p className="text-gray-500 text-lg">Select The Place</p>
      </div>
    );
  }

  // 🔹 Success State
  return (
    <div className="w-[600px] bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold">{cityData.name} 🎬</h2>
      <h3 className="text-lg font-semibold text-blue-600">
        {cityData.movieHall?.name}
      </h3>
      <p className="text-sm text-gray-600">
        📍 {cityData.movieHall?.address}
      </p>

      {/* Features */}
      {cityData.movieHall?.features?.length > 0 ? (
        <p className="mt-2 text-sm">
          <span className="font-semibold">Features:</span>{" "}
          {cityData.movieHall.features.join(", ")}
        </p>
      ) : (
        <p className="mt-2 text-sm text-gray-400">No special features listed.</p>
      )}
     <p>Price : {cityData.moviHall.pricePerSeat} </p>
    </div>
  );
}
