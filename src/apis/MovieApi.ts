import { MoviesResponse } from "../../types/movieApiType";

export async function getMovies({ page }: { page: number }) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  const response = fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return response as unknown as MoviesResponse;
}
