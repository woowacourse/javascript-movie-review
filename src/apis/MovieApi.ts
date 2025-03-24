import { MoviesResponse } from "../../types/movieApiType";

async function fetchWithErrorHandling(url: string): Promise<MoviesResponse> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  };

  return fetch(url, options).then((res) => {
    if (res.ok) return res.json();
    throw new Error(String(res.status));
  });
}

export async function getMovies({ page }: { page: number }) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  return fetchWithErrorHandling(url);
}

export async function getMovieByName({
  name,
  page,
}: {
  name: string;
  page: number;
}) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=ko-KR&page=${page}`;
  return fetchWithErrorHandling(url);
}
