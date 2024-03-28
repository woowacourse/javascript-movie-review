import { Path } from "../components/templates/movie/generateMovieItems";
import { MovieItem, MovieDetail } from "../types/movie";
import APIClient from "./APIClient";

const BASE_URL = "https://api.themoviedb.org";

const POPULAR_MOVIE_LIST_PATH = "/3/movie/popular";
const SEARCH_MOVIE_PATH = `/3/search/movie`;

const KOREAN_LANGUAGE = "ko-KR";

const header = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_ACCESS_KEY}`,
};

const BASE_POSTER_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

type DateString = string;

interface MovieItemRawData {
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

interface Genre {
  id: number;
  name: string;
}
interface MovieDetailRawData {
  genres: Genre[];
  id: number;
  overview: string;
  poster_path: Path;
  title: string;
  vote_average: number;
}

const parseMovieItem = ({
  id,
  title,
  poster_path,
  vote_average,
}: MovieItemRawData) => ({
  id,
  title,
  posterSrc: BASE_POSTER_URL + poster_path,
  voteAverage: vote_average,
});

const parseMovieDetail = ({
  id,
  title,
  poster_path,
  vote_average,
  genres,
  overview,
}: MovieDetailRawData) => ({
  id,
  title,
  posterSrc: BASE_POSTER_URL + poster_path,
  voteAverage: vote_average,
  genres: genres.map(({ name }) => name),
  overview,
});

const tmdbAPIClient = new APIClient(BASE_URL, header);

export const getPopularMovieList = async (
  page: number = 1
): Promise<MovieItem[]> => {
  const data = await tmdbAPIClient.get<{ results: MovieItemRawData[] }>(
    POPULAR_MOVIE_LIST_PATH,
    new URLSearchParams({
      language: KOREAN_LANGUAGE,
      page: page.toString(),
    })
  );

  return data.results.map(parseMovieItem);
};

export const getSearchMovieList = async (
  query: string,
  page: number = 1
): Promise<MovieItem[]> => {
  const data = await tmdbAPIClient.get<{ results: MovieItemRawData[] }>(
    SEARCH_MOVIE_PATH,
    new URLSearchParams({
      language: KOREAN_LANGUAGE,
      query,
      page: page.toString(),
    })
  );

  return data.results.map(parseMovieItem);
};

export const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const data = await tmdbAPIClient.get<MovieDetailRawData>(
    `/3/movie/${movieId}`,
    new URLSearchParams({
      language: KOREAN_LANGUAGE,
    })
  );

  return parseMovieDetail(data);
};
