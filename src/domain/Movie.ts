import { request } from '../utils/common';
import { MovieInfo, ParsedMovieResult } from '../types/type';
import { ApiMovieResult, ApiResponseResult } from '../apis/tmdbType';
import { getPopularUrl, getSearchUrl } from '../apis/tmdb';

export interface MovieInformation {
  movieResult: ParsedMovieResult;
  update: (word: string) => Promise<void>;
  handleParsing: (word: string) => Promise<ParsedMovieResult>;
  parseFetchedMovies: (fetchedMovies: ApiMovieResult[]) => MovieInfo[];
  resetPageIndex: () => void;
}

class Movie {
  #parsedMovieResult: ParsedMovieResult = { isLastPage: true, movies: [] };
  #pageIndex: number = 1;

  get movieResult(): ParsedMovieResult {
    return this.#parsedMovieResult;
  }

  async update(word: string = ''): Promise<void> {
    const movies = await this.handleParsing(word);
    this.#parsedMovieResult = movies;
  }

  async handleParsing(word: string): Promise<ParsedMovieResult> {
    const url =
      word === '' ? getPopularUrl({ pageIndex: this.#pageIndex }) : getSearchUrl({ pageIndex: this.#pageIndex, word });

    const apiFetchingData = await request<ApiResponseResult>(url);

    const fetchedMovies = apiFetchingData.results;

    if (apiFetchingData.total_pages > this.#pageIndex) {
      this.#pageIndex += 1;
    }

    const movies = this.parseFetchedMovies(fetchedMovies);

    return {
      isLastPage: apiFetchingData.total_pages === this.#pageIndex,
      movies,
    };
  }

  parseFetchedMovies(fetchedMovies: ApiMovieResult[]): MovieInfo[] {
    return fetchedMovies.map((movie: ApiMovieResult) => {
      return {
        id: movie.id,
        title: movie.title,
        imgUrl: movie.poster_path,
        score: movie.vote_average,
        description: movie.overview,
      };
    });
  }

  resetPageIndex(): void {
    this.#pageIndex = 1;
  }
}

export default Movie;
