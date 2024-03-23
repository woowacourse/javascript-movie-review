import { BASE_URL, endPoint, options } from '../config';
import { MAX_PAGE } from '../constants';
import { checkAPIStatus, checkInvalidJSON } from '../utils';

import dataStateStore from './DataStateStore';

class APIClient {
  #currentPage = 0;

  #isShowMoreButton = (page: number, totalPage: number) =>
    page < totalPage && page <= MAX_PAGE;

  #updateCurrentPage = (isResetCurrentPage: boolean) => {
    this.#currentPage = isResetCurrentPage ? 1 : this.#currentPage + 1;
  };
  // error

  async fetchPopularMovie() {
    const response = await fetch(
      `${BASE_URL}/${endPoint.popularMovie(this.#currentPage)}`,
      options,
    );

    return response;
  }

  async handleFetchPopularMovie() {
    try {
      const response = await this.fetchPopularMovie();
      checkAPIStatus(response);
      return await response.json();
    } catch (error) {
      const apiError = checkInvalidJSON(error);
      return apiError;
    }
  }

  async fetchSearchMovie(title: string) {
    const response = await fetch(
      `${BASE_URL}/${endPoint.searchMovie(title, this.#currentPage)}`,
      options,
    );

    return response;
  }

  async handleFetchSearchMovie(title: string) {
    try {
      const response = await this.fetchSearchMovie(title);
      checkAPIStatus(response);
      return await response.json();
    } catch (error) {
      const apiError = checkInvalidJSON(error);
      return apiError;
    }
  }

  async getPopularMovieData(isResetCurrentPage: boolean) {
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.handleFetchPopularMovie();

    if (data instanceof Error) throw new Error(data.message);

    dataStateStore.getTotalMovieData(
      {
        movieList: data.results,
        isShowMoreButton: this.#isShowMoreButton(data.page, data.total_pages),
      },
      isResetCurrentPage,
    );
  }

  async getSearchMovieData(isResetCurrentPage: boolean, title: string) {
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.handleFetchSearchMovie(title);

    if (data instanceof Error) throw new Error(data.message);

    dataStateStore.getTotalMovieData(
      {
        movieList: data.results,
        isShowMoreButton: this.#isShowMoreButton(data.page, data.total_pages),
      },
      isResetCurrentPage,
    );
  }
}

const apiClient = new APIClient();

export default apiClient;
