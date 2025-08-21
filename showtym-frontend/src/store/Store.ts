// store.ts
import { create } from "zustand";

type UpcomingMovie = {
  data: any[];
  setUpcomingMovie: (newData: any[]) => void;
};

type IndianMovie = {
  data: any[];
  setIndianMovie: (newData: any[]) => void;
};

type UsaMovies = {
  data: any[];
  setUsaMovie: (newData: any[]) => void;
};

export const useUpcomingMovie = create<UpcomingMovie>((set) => ({
  data: [],
  setUpcomingMovie: (newData) => set({ data: newData }),
}));

export const useIndianMovie = create<IndianMovie>((set)=>({
    data : [],
    setIndianMovie: (newData)=> set({data : newData})
}))

export const useUsaMovie = create<UsaMovies>((set)=>({
    data : [],
    setUsaMovie: (newData)=> set({data : newData})
}))