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
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc=${page}`,
  search: (query: string) =>
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=1&query=${encodeURIComponent(
      query
    )}`,
  more: (page: number) =>
    `https://api.themoviedb.org/3/search/movie?include_adult=false&language=ko-KR&page=${page}&query=${encodeURIComponent(
      searchInputValue
    )}`,
} as const;
