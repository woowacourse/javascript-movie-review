import { Path } from "../components/templates/movie/generateMovieItems";
import { Movie } from "../types/movie";
import APIClient from "./APIClient";

const BASE_URL = "https://api.themoviedb.org";

const POPULAR_MOVIE_LIST_PATH = "/3/movie/popular";
const SEARCH_MOVIE_PATH = `/3/search/movie`;

const KOREAN_LANGUAGE = "ko-KR";

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

const tmdbAPIClient = new APIClient(BASE_URL, header);

export const getPopularMovieList = async (
  page: number = 1
): Promise<Movie[]> => {
  const data = await tmdbAPIClient.get<{ results: MovieRawData[] }>(
    POPULAR_MOVIE_LIST_PATH,
    new URLSearchParams({
      language: KOREAN_LANGUAGE,
      page: page.toString(),
    })
  );

  return parseRawMovieList(data.results);
};

export const getSearchMovieList = async (
  query: string,
  page: number = 1
): Promise<Movie[]> => {
  const data = await tmdbAPIClient.get<{ results: MovieRawData[] }>(
    SEARCH_MOVIE_PATH,
    new URLSearchParams({
      language: KOREAN_LANGUAGE,
      query,
      page: page.toString(),
    })
  );

  return parseRawMovieList(data.results);
};
