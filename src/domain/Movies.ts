import { request } from '../utils/common';
import { ApiMovieProps, ParsedMovieResult } from '../types/type';

export const BASE_URL = 'https://api.themoviedb.org/3/';

class Movies {
  #parsedMovieResult: ParsedMovieResult = { isLastPage: false, movies: [] };
  #pageIndex: number = 1;

  get movieResult(): ParsedMovieResult {
    return this.#parsedMovieResult;
  }

  async update(word: string = '') {
    const movies = await this.handleParsing(word);
    this.#parsedMovieResult = movies;
  }

  async handleParsing(word: string): Promise<ParsedMovieResult> {
    const url =
      word === ''
        ? `${BASE_URL}movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${this.#pageIndex}`
        : `${BASE_URL}search/movie?api_key=${process.env.API_KEY}&language=ko&page=${this.#pageIndex}&query=${word}`;

    const apiFetchingData = await (await request(url)).json();

    const fetchedMovies = await apiFetchingData.results;

    if (apiFetchingData.total_pages > this.#pageIndex) {
      this.#pageIndex += 1;
    }

    const movies = this.parseFetchedMovies(fetchedMovies);

    return {
      isLastPage: apiFetchingData.total_pages === this.#pageIndex,
      movies,
    };
  }

  parseFetchedMovies(fetchedMovies: ApiMovieProps[]) {
    return fetchedMovies.map((movie: ApiMovieProps) => {
      return {
        id: movie.id,
        title: movie.title,
        imgUrl: movie.poster_path,
        score: movie.vote_average,
      };
    });
  }

  resetPageIndex() {
    this.#pageIndex = 1;
  }
}

export default Movies;
