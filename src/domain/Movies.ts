import { MOVIE_SEARCH_URL, POPULAR_MOVIES_URL } from '../api';
import Fetcher, { DataFetcher } from '../api/Fetcher';
import CustomError from '../utils/CustomError';

export interface ResponseMovieData {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface ResponseErrorData {
  status_message: string;
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
    const urlParams = { language: 'ko-KR', page: String(page) };
    const url = `${POPULAR_MOVIES_URL}?${new URLSearchParams(urlParams)}`;
    const { results }: ResponseMovieData = await this.#fetcher.getData(url, this.#headers);

    return results.map((result) => ({
      poster_path: result.poster_path,
      title: result.title,
      vote_average: result.vote_average,
    }));
  }

  async getSearchMovies(query: string, page = 1): Promise<MovieInfo[]> {
    const urlParams = { query, language: 'ko-KR', page: String(page) };
    const url = `${MOVIE_SEARCH_URL}?${new URLSearchParams(urlParams)}`;

    const { results }: ResponseMovieData = await this.#fetcher.getData(url, this.#headers);

    return results.map(({ poster_path, title, vote_average }) => ({
      poster_path,
      title,
      vote_average,
    }));
  }

  static async handleErrorResponse(response: Response) {
    const { status_message }: ResponseErrorData = await response.json();

    if (response.status === 400) throw new CustomError(status_message, response.status);
    if (response.status === 401) throw new CustomError(status_message, response.status);
    if (response.status === 403) throw new CustomError('Forbidden', response.status);
    if (response.status === 404) throw new CustomError(status_message, response.status);
    if (Math.floor(response.status / 100) === 5)
      throw new CustomError('서버에 문제가 발생했습니다. 다시 시도해보시겠어요?', response.status);
  }
}

export default Movies;
