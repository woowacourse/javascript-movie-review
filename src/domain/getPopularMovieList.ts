import { API_KEY, POPULAR_MOVIES_URL } from "../constants/api";

import validateResponse from "./validateResponse";

const getPopularMovieList = async ({ page }: { page: number }) => {
  const url = POPULAR_MOVIES_URL;
  const queryParams = `language=ko-KR&page=${page}&api_key=${API_KEY}`;
  const popularMoviesUrl = `${url}?${queryParams}`;

  const res = await fetch(popularMoviesUrl);
  validateResponse(res.status);

  const popularMovieList = await res.json();

  return {
    movieList: extractMovies(popularMovieList.results),
    totalPage: popularMovieList.total_pages,
  };
};

export default getPopularMovieList;

const extractMovies: (movies: PopularMovieResult[]) => PopularMovie[] = (
  movies: PopularMovieResult[]
) => {
  return movies.map((movie) => ({
    id: movie.id,
    korTitle: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
  }));
};

interface PopularMovie {
  id: number;
  korTitle: string;
  posterPath: string;
  voteAverage: number;
}

interface PopularMovieResult {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
