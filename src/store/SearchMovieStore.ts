import { Movie } from '../index.d';

import { ERROR_2XX } from '../constants';

import ErrorRender from '../components/ErrorRender';

import { fetchSearchMovies } from './API';

class SearchMovieStore {
  #searchMoviesData: Movie[];

  #totalPages: number = 0;

  #query: string = '';

  #presentPage: number = 1;

  constructor() {
    this.#searchMoviesData = [];
  }

  async searchMovies() {
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

  async #fetchSearchData() {
    const response = await fetchSearchMovies(this.#query, this.#presentPage);
    this.#handleResponseError(response);

    const responseJSON = await response.json();
    this.#handleResponseJSONError(response, responseJSON);

    return responseJSON;
  }

  #handleResponseError(response: Response) {
    if (!response.ok) {
      throw new ErrorRender(String(response.status)).renderError();
    }
  }

  #handleResponseJSONError(response: Response, responseJSON: any) {
    if (String(response.status)[0] === ERROR_2XX && responseJSON.results.length === 0) {
      throw new ErrorRender(String(response.status)).renderError();
    }
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
