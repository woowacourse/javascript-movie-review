import { request } from '../utils/common';
import { MovieDetailInfo, MovieInfo, ParsedMovieResult } from '../types/type';
import { MovieListResult, ApiMovieListResult, MovieDetailResult } from '../apis/tmdbType';
import { getDetailUrl, getPopularUrl, getSearchUrl } from '../apis/tmdb';

export interface MovieInformation {
  movieResult: ParsedMovieResult;
  update: (word: string) => Promise<void>;
  getParsedMovieList: (word: string) => Promise<ParsedMovieResult>;
  parseMovieList: (fetchedMovies: MovieListResult[]) => MovieInfo[];
  resetPageIndex: () => void;
}

class Movie {
  #parsedMovieResult: ParsedMovieResult = { isLastPage: true, movies: [] };

  #pageIndex: number = 1;

  get movieResult(): ParsedMovieResult {
    return this.#parsedMovieResult;
  }

  async update(word: string = ''): Promise<void> {
    this.#parsedMovieResult = await this.getParsedMovieList(word);
  }

  async getParsedMovieList(word: string): Promise<ParsedMovieResult> {
    const url =
      word === '' ? getPopularUrl({ pageIndex: this.#pageIndex }) : getSearchUrl({ pageIndex: this.#pageIndex, word });

    const apiFetchingData = await request<ApiMovieListResult>(url);
    const fetchedMovies = apiFetchingData.results;

    if (apiFetchingData.total_pages > this.#pageIndex) {
      this.#pageIndex += 1;
    }

    const movies = this.parseMovieList(fetchedMovies);

    return {
      isLastPage: apiFetchingData.total_pages === this.#pageIndex,
      movies,
    };
  }

  parseMovieList(fetchedMovies: MovieListResult[]): MovieInfo[] {
    return fetchedMovies.map((movie: MovieListResult) => {
      return {
        id: movie.id,
        title: movie.title,
        imgUrl: movie.poster_path,
        score: movie.vote_average,
        description: movie.overview,
      };
    });
  }

  static async getParsedDetailResult(id: number): Promise<MovieDetailInfo> {
    const url = getDetailUrl({ id });

    const fetchedData = await request<MovieDetailResult>(url);
    const movieDetail = Movie.parseMovieDatail(fetchedData);

    return movieDetail;
  }

  static parseMovieDatail(fetchedMovie: MovieDetailResult): MovieDetailInfo {
    return {
      id: fetchedMovie.id,
      title: fetchedMovie.title,
      imgUrl: fetchedMovie.poster_path,
      score: fetchedMovie.vote_average,
      description: fetchedMovie.overview,
      categories: fetchedMovie.genres.map(genre => genre.name).join(', '),
      releaseDate: fetchedMovie.release_date,
      runningTime: fetchedMovie.runtime,
    };
  }

  resetPageIndex(): void {
    this.#pageIndex = 1;
  }
}

export default Movie;
