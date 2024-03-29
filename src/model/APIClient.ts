import { renderErrorItemView } from "../components/ErrorView";
import { BASE_URL, endpoint, options } from "../config";
import { MAX_PAGE } from "../constants/system";

import movieDataStateStore from "./MovieDataStateStore";

class APIClient {
  #currentPage = 0;

  #isEndPage = (page: number, totalPage: number) =>
    page >= totalPage && page > MAX_PAGE;

  #updateCurrentPage = (isResetCurrentPage: boolean) => {
    if (isResetCurrentPage) this.#currentPage = 1;
    else this.#currentPage += 1;
  };

  async getPopularMovieData(isResetCurrentPage: boolean) {
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.fetchPopularMovie();
    const isEndPage = this.#isEndPage(data.page, data.total_pages);

    movieDataStateStore.addMovieData({ movieList: data.results, isEndPage });
  }

  async fetchPopularMovie() {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint.popularMovie(this.#currentPage)}`,
        options,
      );
      return await response.json();
    } catch (error) {
      renderErrorItemView();
      return error;
    }
  }

  async getSearchMovieData(isResetCurrentPage: boolean, title: string) {
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.fetchSearchMovie(title);
    const isEndPage = this.#isEndPage(this.#currentPage, data.total_pages);

    movieDataStateStore.addMovieData({ movieList: data.results, isEndPage });
  }

  async fetchSearchMovie(title: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint.searchMovie(title, this.#currentPage)}`,
        options,
      );
      return await response.json();
    } catch (error) {
      renderErrorItemView();
      return error;
    }
  }

  async getOneMovieDetailData(movieId: number) {
    const data = await this.fetchOneMovieDetail(movieId);
    return data;
  }

  async fetchOneMovieDetail(movieId: number) {
    try {
      const response = await fetch(
        `${BASE_URL}/${endpoint.oneMovieDetail(movieId)}`,
        options,
      );
      return await response.json();
    } catch (error) {
      renderErrorItemView();
      return error;
    }
  }
}

const apiClient = new APIClient();
export default apiClient;
