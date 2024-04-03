import { REQUEST_URL, COMMON_OPTIONS } from '../constants/requests';
import fetchData from '../utils/fetchData';
import { generateUrl, Params } from '../utils/generateUrl';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

export interface MovieData {
  movies: Movie[];
  page: number;
  isLastPage: boolean;
  isEmptyResults: boolean;
}

interface MovieResults {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const fetchMovies = async (url: string): Promise<MovieData> => {
  const data = await fetchData({
    url,
    options: COMMON_OPTIONS,
  });

  const { page, total_pages, results, total_results } = data;
  const isLastPage = page === total_pages;
  const isEmptyResults: boolean = total_results === 0;
  const movies: Movie[] = results.map((movie: MovieResults) => ({
    id: movie.id,
    title: movie.title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
  }));

  return { movies, page, isLastPage, isEmptyResults };
};

export const MovieService = {
  async fetchSearchMovies(params: Params) {
    const url = generateUrl(REQUEST_URL.searchMovies, params);
    return fetchMovies(url);
  },

  async fetchPopularMovies(params: Params) {
    const url = generateUrl(REQUEST_URL.popularMovies, params);
    return fetchMovies(url);
  },
};
