import MovieDetails from "../types/MovieDetails";
import request from "./utils/request";
import Movie from "../store/Movie";

export default async function fetchDetailsMovie(id: number): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  const data = await request<MovieDetails>(url, options);
  return Movie.fromTMDB(data);
}
