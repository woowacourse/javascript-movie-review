import { Movie } from '../index.d';
import { ERROR_2XX } from '../constants';

import ErrorRender from '../components/ErrorRender';

const searchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

class SearchMovieStore {
  #searchMoviesData: any[];

  #totalPages: number = 0;

  #query: string = '';

  #presentPage: number = 1;

  constructor() {
    this.#searchMoviesData = [];
  }

  /* eslint-disable max-lines-per-function */
  async searchMovies() {
    await this.#delay(); // Skeleton UI 확인을 위한 강제 delay

    try {
      const responseData = await this.#fetchSearchData();
      const { results } = responseData;
      this.#totalPages = responseData.total_pages;
      this.#pushNewData(results);
      return results;
    } catch (error) {
      console.error(error);
    }
  }

  /* eslint-disable max-lines-per-function */
  async #fetchSearchData() {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${this.#query}&include_adult=false&language=ko&page=${this.#presentPage}`,
      searchOptions,
    );

    if (!response.ok) {
      throw new ErrorRender(String(response.status)).renderError();
    }

    const responseJSON = await response.json();

    if (String(response.status)[0] === ERROR_2XX && responseJSON.results.length === 0) {
      throw new ErrorRender(String(response.status)).renderError();
    }

    return responseJSON;
  }

  async #delay() {
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(2000);
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
