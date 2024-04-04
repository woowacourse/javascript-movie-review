import { Movie } from '../index.d';

import { fetchPopularMovies } from './API';

import { ERROR_2XX } from '../constants';

import ErrorRender from '../components/ErrorRender';

class MovieStore {
  #moviesData: Movie[];

  #pageCount: number = 1;

  constructor() {
    this.#moviesData = [];
  }

  async getMovies() {
    try {
      const responseData = await this.#fetchMoviesData();
      this.#pushNewData(responseData);
      return responseData;
    } catch (error) {
      console.error(error);
    }
  }

  async #fetchMoviesData() {
    const response = await fetchPopularMovies(this.#pageCount);
    this.#handleResponseError(response);

    const responseJSON = await response.json();
    this.#handleResponseJSONError(response, responseJSON);

    return responseJSON.results;
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
    this.#pageCount += 1;
  }

  #pushNewData(data: Movie[]) {
    if (data) {
      this.#moviesData.push(...data);
    }
  }

  get movies() {
    return this.#moviesData;
  }
}

const movieStore = new MovieStore();

export default movieStore;
