import { fetchAPI } from "./utils/fetchAPI";
import { POPULAR_MOVIE_LIST_PATH, SEARCH_MOVIE_LIST_PATH } from "./utils/paths";
import { Movie, Path } from "../components/templates/generateMovieItems";

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
  const movieList = await fetchAPI(POPULAR_MOVIE_LIST_PATH, `page=${page}`);

  return parseRawMovieList(movieList.results);
};

export const getSearchMovieList = async (
  query: string,
  page: number = 1
): Promise<Movie[]> => {
  const movieList = await fetchAPI(
    SEARCH_MOVIE_LIST_PATH,
    `query=${query}&page=${page}`
  );

  return parseRawMovieList(movieList.results);
};
