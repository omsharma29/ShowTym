import {  useCityStore, useDate } from "@/store/Store";
export default function SeatBook() {
  const {selectedCity, cityData} = useCityStore()
  const {DateData, TimeData} = useDate()
  return (
        <div>
      <h1>Selected Date:</h1>
      <div>{selectedCity}</div> {/* showing state inside div */}
      <div>{cityData.movieHall?.name}</div>
      <div>{DateData?.toDateString()}</div>
      <div>{TimeData}</div>
    </div>
  )
}
