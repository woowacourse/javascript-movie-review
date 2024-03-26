import MovieApi from '../API/MovieApi';
import { Movie } from '../index.d';

class SearchMovieStore {
  #searchMoviesData: any[] = [];

  #totalPages: number = 0;

  #query: string = '';

  #presentPage: number = 1;

  /* eslint-disable max-lines-per-function */
  async searchMovies() {
    const responseData = await MovieApi.getSearchData(this.#query, this.#presentPage);
    const moviesData = responseData.results;

    this.#totalPages = responseData.total_pages;
    this.#pushNewData(moviesData);

    return moviesData;
  }

  increasePageCount() {
    this.#presentPage += 1;
  }

  #pushNewData(data: Movie[]) {
    if (data) {
      this.#searchMoviesData.push(...data);
    }
  }

  get movies() {
    return this.#searchMoviesData;
  }

  get totalPages() {
    return this.#totalPages;
  }

  get presentPage() {
    return this.#presentPage;
  }

  get query() {
    return this.#query;
  }

  set query(query: string) {
    this.#query = query;
    this.#presentPage = 1;
  }
}

const searchMovieStore = new SearchMovieStore();

export default searchMovieStore;
