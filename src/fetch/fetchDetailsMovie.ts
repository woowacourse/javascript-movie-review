import MovieDetails from "../types/MovieDetails";
import request from "./utils/request";

export default async function fetchDetailsMovie(id: number) {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const results = await request<MovieDetails>(url, options);
  return results;
}
