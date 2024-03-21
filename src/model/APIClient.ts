import { BASE_URL, endpoint, options } from "../config";
import { MAX_PAGE } from "../constants/system";

import dataStateStore from "./DataStateStore";

class APIClient {
  #currentPage = 0;

  #isShowMoreButton = (page: number, totalPage: number) =>
    page < totalPage && page <= MAX_PAGE;

  #updateCurrentPage = (isResetCurrentPage: boolean) => {
    if (isResetCurrentPage) this.#currentPage = 1;
    else this.#currentPage += 1;
  };

  async getPopularMovieData(isResetCurrentPage: boolean) {
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.fetchPopuplarMovie();

    dataStateStore.getTotalMovieData(
      {
        movieList: data.results,
        isShowMoreButton: this.#isShowMoreButton(data.page, data.total_pages),
      },
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
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.fetchSearchMovie(title);

    dataStateStore.getTotalMovieData(
      {
        movieList: data.results,
        isShowMoreButton: this.#isShowMoreButton(data.page, data.total_pages),
      },
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
