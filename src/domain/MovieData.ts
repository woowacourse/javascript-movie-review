import { request } from '../utils/common';
import { ApiMovieProps, ParsedMovieResult } from '../types/type';

const BASE_URL = 'https://api.themoviedb.org/3/movie/';

class MovieData {
  #parsedMovieResult: ParsedMovieResult = { isLastPage: false, movies: [] };
  #pageIndex: number = 1;

  get movieResult(): ParsedMovieResult {
    return this.#parsedMovieResult;
  }

  async update() {
    const movies = await this.handleParsing();

    this.#parsedMovieResult = movies;
  }

  async handleParsing(word: string = ''): Promise<ParsedMovieResult> {
    const url =
      word === ''
        ? `${BASE_URL}popular?api_key=${process.env.API_KEY}&language=ko&page=${this.#pageIndex}`
        : `${BASE_URL}search/movie?api_key=${process.env.API_KEY}&query=${word}&language=ko&page=${this.#pageIndex}`;

    const apiFetchingData = await (await request(url)).json();

    const fetchingMovies = await apiFetchingData.results;

    if (apiFetchingData.total_pages > this.#pageIndex) {
      this.#pageIndex += 1;
    }

    const movies = this.parseFetchingMovies(fetchingMovies);

    return {
      isLastPage: apiFetchingData.total_pages === this.#pageIndex,
      movies,
    };
  }

  parseFetchingMovies(fetchingMovies: ApiMovieProps[]) {
    return fetchingMovies.map((movie: ApiMovieProps) => {
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

export default MovieData;
