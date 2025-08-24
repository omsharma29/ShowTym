// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Movie {
  id: string;
  originalTitle: string;
  description: string;
  primaryImage: string;
  genres: string[];
  spokenLanguages: string[];
}

type MovieStore = {
  movies: Movie[];
  addMovies: (newMovies: Movie[]) => void;
  // getMovieById: (id: string) => Movie | undefined;
};



type CityStore = {
  selectedCity: string;
  cityData: any;
  setSelectedCity: (city: string) => void;
  setCityData: (data: any) => void;

};




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

export const useCast = create<Cast>()((set) => ({
  data: [],
  setCast: (newData) => set({ data: newData })
}),
)

export const MovieStore = create<MovieStore>()(persist( (set) => ({
      movies: [],
      addMovies: (newData) => set((state) => ({
        movies : [...state.movies, ...newData.filter((m) => !state.movies.some((existing)=> existing.id === m.id))]
      })),
    }),
{name : "all-movies"}
))

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: "Select Place",
  cityData: null,
  setSelectedCity: (city) => set({ selectedCity: city }),
  setCityData: (data) => set({ cityData: data }),
}));