// store.ts
import { data } from "react-router-dom";
import { create } from "zustand";
import { persist } from "zustand/middleware";


type UpcomingMovie = {
  data: any[];
  setUpcomingMovie: (newData: any[]) => void;
};

type Cast = {
  data: any[];
  setCast: (newData: any[]) => void;
};


type IndianMovie = {
  data: any[];
  setIndianMovie: (newData: any[]) => void;
};

type UsaMovies = {
  data: any[];
  setUsaMovie: (newData: any[]) => void;
};

export const useUpcomingMovie = create<UpcomingMovie>()(
  persist(
    (set) => ({
      data: [],
      setUpcomingMovie: (newData) => set({ data: newData }),
    }),
    {
      name: "upcoming-movies", // ✅ key in localStorage
    }
  )
);

export const useIndianMovie = create<IndianMovie>()(persist((set) => ({
  data: [],
  setIndianMovie: (newData) => set({ data: newData })
}),
  { name: "Indian-Movies", }
))

export const useUsaMovie = create<UsaMovies>()(persist((set) => ({
  data: [],
  setUsaMovie: (newData) => set({ data: newData })
}),
  { name: "usa-movies", }
))

export const useCast = create<Cast>()(persist((set) => ({
  data: [],
  setCast: (newData) => set({ data: newData })
}),
  { name: "moviecast" }
))