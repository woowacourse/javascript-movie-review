import { Movie, Path } from "../components/templates/generateMovieItems";
import APIError from "../error/APIError";

const BASE_URL = "https://api.themoviedb.org/3";

const POPULAR_MOVIE_LIST_PATH = "/movie/popular";
const SEARCH_MOVIE_LIST_PATH = "/search/movie";

type DateString = string;

interface MovieRawData {
  adult: boolean;
  backdrop_path: Path;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: Path;
  release_date: DateString;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const parseRawMovieList = (movieRawDataList: MovieRawData[]): Movie[] =>
  movieRawDataList.map((movieRawData: MovieRawData) => ({
    id: movieRawData.id,
    title: movieRawData.title,
    posterPath: movieRawData.poster_path,
    voteAverage: movieRawData.vote_average,
  }));

export const getPopularMovieList = async (
  page: number = 1
): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}${POPULAR_MOVIE_LIST_PATH}?language=ko-KR&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_KEY}`,
      },
    }
  );

  const movieList = await response.json();

  return parseRawMovieList(movieList.results);
};

export const getSearchMovieList = async (
  query: string,
  page: number = 1
): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_LIST_PATH}?query=${query}&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_KEY}`,
      },
    }
  );

  const movieList = await response.json();

  if (response.ok) {
    return parseRawMovieList(movieList.results);
  } else {
    throw new APIError(response.status);
  }
};
