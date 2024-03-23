import { Path } from "../components/templates/movie/generateMovieItems";
import { Movie } from "../types/movie";
import Fetcher from "./Fetcher";

const BASE_URL = "https://api.themoviedb.org/3";

const formatPopularMovieListPath = (page: number) =>
  `/movie/popular?language=ko-KR&page=${page}`;

const formatSearchMovieListPath = (query: string, page: number) =>
  `/search/movie?language=ko-KR&query=${query}&page=${page}`;

const header = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_ACCESS_KEY}`,
};

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

const tmdbFetcher = new Fetcher(BASE_URL, header);

export const getPopularMovieList = async (
  page: number = 1
): Promise<Movie[]> => {
  const data = await tmdbFetcher.get<{ results: MovieRawData[] }>(
    formatPopularMovieListPath(page)
  );

  return parseRawMovieList(data.results);
};

export const getSearchMovieList = async (
  query: string,
  page: number = 1
): Promise<Movie[]> => {
  const data = await tmdbFetcher.get<{ results: MovieRawData[] }>(
    formatSearchMovieListPath(query, page)
  );

  return parseRawMovieList(data.results);
};
