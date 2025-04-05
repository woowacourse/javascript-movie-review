import { searchInputValue } from "../../store/store";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
} as const;

export const url = {
  popular: (page: number) =>
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc`,
  search: (query: string) =>
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1&query=${encodeURIComponent(
      query
    )}`,
  more: (page: number) =>
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=${page}&query=${encodeURIComponent(
      searchInputValue
    )}`,
  detail: (id: number) =>
    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
} as const;

export const initMovie = {
  adult: false,
  backdrop_path: "",
  genre_ids: [],
  id: 0,
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  release_date: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0,

  isLoading: true,
};
