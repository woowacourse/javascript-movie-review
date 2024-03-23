import { MOVIE_SEARCH_URL, POPULAR_MOVIES_URL } from '../api';
import Fetcher, { DataFetcher } from '../api/Fetcher';

export interface ResponseMovieData {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface MovieInfo {
  poster_path: string;
  title: string;
  vote_average: number;
}

class Movies {
  #fetcher: DataFetcher;
  #headers: HeadersInit;

  constructor() {
    this.#fetcher = new Fetcher();
    this.#headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  }

  async getPopularMovies(page = 1): Promise<MovieInfo[]> {
    const urlParams = {
      language: 'ko-KR',
      page: String(page),
    };
    const url = `${POPULAR_MOVIES_URL}?${new URLSearchParams(urlParams)}`;

    const { results }: ResponseMovieData = await this.#fetcher.getData(url, this.#headers);

    return results.map((result) => ({
      poster_path: result.poster_path,
      title: result.title,
      vote_average: result.vote_average,
    }));
  }

  async getSearchMovies(query: string, page = 1): Promise<MovieInfo[]> {
    const urlParams = {
      query,
      language: 'ko-KR',
      page: String(page),
    };
    const url = `${MOVIE_SEARCH_URL}?${new URLSearchParams(urlParams)}`;
    const { results }: ResponseMovieData = await this.#fetcher.getData(url, this.#headers);

    return results.map((result) => ({
      poster_path: result.poster_path,
      title: result.title,
      vote_average: result.vote_average,
    }));
  }
}

export default Movies;
