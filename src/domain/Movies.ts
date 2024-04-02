import { MOVIE_DETAIL_URL, MOVIE_SEARCH_URL, POPULAR_MOVIES_URL } from '../api';
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
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

interface ResponseMovieDetailData {
  id: number;
  title: string;
  genres: Genre[];
  overview: string;
  vote_average: number;
  poster_path: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  genres: string[];
  overview: string;
  vote_average: number;
  poster_path: string;
  my_grade: number;
}

interface Genre {
  id: number;
  name: string;
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
    const { results }: ResponseMovieData = await this.#fetcher.getData({
      url,
      headers: this.#headers,
      handleError: this.#handleErrorResponse,
    });

    return results.map(({ id, poster_path, title, vote_average }) => ({
      id,
      poster_path,
      title,
      vote_average,
    }));
  }

  async getSearchMovies(query: string, page = 1): Promise<MovieInfo[]> {
    const urlParams = { query, language: 'ko-KR', page: String(page) };
    const url = `${MOVIE_SEARCH_URL}?${new URLSearchParams(urlParams)}`;

    const { results }: ResponseMovieData = await this.#fetcher.getData({
      url,
      headers: this.#headers,
      handleError: this.#handleErrorResponse,
    });

    return results.map(({ id, poster_path, title, vote_average }) => ({
      id,
      poster_path,
      title,
      vote_average,
    }));
  }

  async getMovieDetail(movieId: number) {
    const urlParams = { language: 'ko-KR' };
    const url = `${MOVIE_DETAIL_URL}/${movieId}?${new URLSearchParams(urlParams)}`;

    const { id, title, genres, overview, vote_average, poster_path }: ResponseMovieDetailData =
      await this.#fetcher.getData({
        url,
        headers: this.#headers,
        handleError: this.#handleErrorResponse,
      });

    const genreNames = genres.map((genre) => genre.name);

    return { id, title, genres: genreNames, overview, vote_average, poster_path, my_grade: 0 };
  }

  async #handleErrorResponse(response: Response) {
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
