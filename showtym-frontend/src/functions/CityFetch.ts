import axios from "axios";

// lib/cityFetch.ts
export async function fetchCityData(city: string) {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/movie/${city}`);
  if (!res.data) {
    throw new Error("Failed to fetch city data");
  }
  console.log(res.data)
  return res.data;
}
