import { IMovie } from "../type";

export interface PopularMoviesResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

const getPopularMovies = async ({
  page,
}: {
  page: number;
}): Promise<PopularMoviesResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return data;
};

export default getPopularMovies;
