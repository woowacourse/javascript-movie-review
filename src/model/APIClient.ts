/* eslint-disable max-lines-per-function */
import { BASE_URL, endpoint, options } from "../config";

import dataStateStore from "./DataStateStore";

class APIClient {
  #currentPage = 1;

  async getPopularMovieData(isResetCurrentPage: boolean) {
    if (isResetCurrentPage) this.#currentPage = 1;
    else this.#currentPage += 1;

    const data = await this.fetchPopuplarMovie();

    const isShowMoreButton = data.page < data.total_pages;
    dataStateStore.getTotalMovieData(
      { movieData: data.results, isShowMoreButton },
      isResetCurrentPage,
    );
  }

  async fetchPopuplarMovie() {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint.popularMoive(this.#currentPage)}`,
        options,
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  }

  async getSearchMovieData(isResetCurrentPage: boolean, title: string) {
    if (isResetCurrentPage) this.#currentPage = 1;
    else this.#currentPage += 1;

    const data = await this.fetchSearchMovie(title);
    console.log(data);

    const isShowMoreButton = data.page < data.total_pages;
    console.log(isShowMoreButton);

    dataStateStore.getTotalMovieData(
      { movieData: data.results, isShowMoreButton },
      isResetCurrentPage,
    );
  }

  async fetchSearchMovie(title: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint.searchMovie(title, this.#currentPage)}`,
        options,
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  }
}

const apiClient = new APIClient();
export default apiClient;
