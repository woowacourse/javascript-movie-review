import MovieApi from '../API/MovieApi';
import { Movie } from '../index.d';

class SearchMovieStore {
  #searchMoviesData: any[] = [];

  #query: string = '';

  #totalPages: number = 100;

  #presentPage: number = 1;

  async searchMovies() {
    const responseData = await MovieApi.getSearchData(this.#query, this.#presentPage);
    const moviesData = responseData.results;

    this.#totalPages = responseData.total_pages;
    this.#pushNewData(moviesData);
    this.increasePageCount();

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
