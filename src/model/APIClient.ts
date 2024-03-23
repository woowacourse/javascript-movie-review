import { BASE_URL, endPoint, options } from '../config';
import { API_ERROR_MESSAGE, MAX_PAGE } from '../constants';

import dataStateStore from './DataStateStore';

class APIClient {
  #currentPage = 0;

  #isShowMoreButton = (page: number, totalPage: number) =>
    page < totalPage && page <= MAX_PAGE;

  #updateCurrentPage = (isResetCurrentPage: boolean) => {
    if (isResetCurrentPage) this.#currentPage = 1;
    else this.#currentPage += 1;
  };

  #makeErrorMessage(status: number) {
    switch (status) {
      case 400:
        return API_ERROR_MESSAGE.notFound;
      case 404:
        return API_ERROR_MESSAGE.badRequest;
      case 500:
        return API_ERROR_MESSAGE.serverError;
      default:
        return API_ERROR_MESSAGE.default;
    }
  }

  #checkAPIStatus(response: Response) {
    if (!response.ok) {
      const message = this.#makeErrorMessage(response.status);
      throw new Error(message);
    }
  }

  #checkInvalidJSON(error: unknown) {
    if (!(error instanceof Error)) return;
    if (error.message.includes('Unexpected end of JSON input')) {
      return new Error(API_ERROR_MESSAGE.inValidJSON);
    }

    return error;
  }

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
      this.#checkAPIStatus(response);
      return await response.json();
    } catch (error) {
      const apiError = this.#checkInvalidJSON(error);
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
      this.#checkAPIStatus(response);
      return await response.json();
    } catch (error) {
      const apiError = this.#checkInvalidJSON(error);
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
