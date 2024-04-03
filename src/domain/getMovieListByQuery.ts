import { API_KEY, SEARCH_MOVIES_URL } from "../constants/api";

import validateResponse from "./validateResponse";

const getMovieListByQuery = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}) => {
  const url = SEARCH_MOVIES_URL;
  const queryParams = `language=ko-KR&page=${page}&query=${query}&api_key=${API_KEY}`;
  const moviesUrl = `${url}?${queryParams}`;

  const res = await fetch(moviesUrl);
  validateResponse(res.status);

  const movieList = await res.json();

  return {
    movieList: extractMovies(movieList.results),
    totalPage: movieList.total_pages,
  };
};

export default getMovieListByQuery;

const extractMovies: (movies: SearchMovieResult[]) => SearchMovie[] = (
  movies: SearchMovieResult[]
) => {
  return movies.map((movie) => ({
    id: movie.id,
    korTitle: movie.title,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
  }));
};

interface SearchMovie {
  id: number;
  korTitle: string;
  posterPath: string;
  voteAverage: number;
}

interface SearchMovieResult {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}
