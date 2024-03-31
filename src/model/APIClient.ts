import { BASE_URL, endPoint, options } from '../config';
import { MAX_PAGE } from '../constants';
import { MovieInfo } from '../type/movie';
import { handleFetchData } from '../utils';

import dataStateStore from './DataStateStore';

class APIClient {
  #currentPage = 0;

  async getPopularMovieListData(isResetCurrentPage: boolean) {
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.#handleFetchPopularMovieList();

    if (data instanceof Error) throw new Error(data.message);

    dataStateStore.getTotalMovieData(
      {
        movieList: data.results,
        isMoreData: this.#isMoreData(data.page, data.total_pages),
      },
      isResetCurrentPage,
    );
  }

  async getSearchMovieListData(isResetCurrentPage: boolean, title: string) {
    this.#updateCurrentPage(isResetCurrentPage);
    const data = await this.#handleFetchSearchMovieList(title);

    if (data instanceof Error) throw new Error(data.message);

    dataStateStore.getTotalMovieData(
      {
        movieList: data.results,
        isMoreData: this.#isMoreData(data.page, data.total_pages),
      },
      isResetCurrentPage,
    );
  }

  async getMovieInfo(id: number) {
    const fetcher = fetch(`${BASE_URL}/${endPoint.movieInfo(id)}`, options);
    // 데이터 불러오기 전 초기화

    const data = await handleFetchData(fetcher);

    if (data instanceof Error) {
      dataStateStore.getMovieInfo(undefined);
      throw new Error(data.message);
    }

    this.#updateMovieInfo(data);
  }
  // typescript-eslint/no-explicit-any rule off
  // eslint-disable-next-line
  #updateMovieInfo(data: any) {
    const movieInfo: MovieInfo = {
      id: data.id,
      title: data.title,
      genres: data.genres,
      poster_path: data.poster_path,
      overview: data.overview,
      vote_average: data.vote_average,
    };

    dataStateStore.getMovieInfo(movieInfo);
  }

  #isMoreData = (page: number, totalPage: number) =>
    page < totalPage && page <= MAX_PAGE;

  #updateCurrentPage = (isResetCurrentPage: boolean) => {
    this.#currentPage = isResetCurrentPage ? 1 : this.#currentPage + 1;
  };

  // fetch
  async #fetchPopularMovieList() {
    const response = await fetch(
      `${BASE_URL}/${endPoint.popularMovie(this.#currentPage)}`,
      options,
    );

    return response;
  }

  async #fetchSearchMovieList(title: string) {
    const response = await fetch(
      `${BASE_URL}/${endPoint.searchMovie(title, this.#currentPage)}`,
      options,
    );

    return response;
  }

  async #handleFetchPopularMovieList() {
    const result = await handleFetchData(this.#fetchPopularMovieList());

    return result;
  }

  async #handleFetchSearchMovieList(title: string) {
    const results = await handleFetchData(this.#fetchSearchMovieList(title));

    return results;
  }
}

const apiClient = new APIClient();

export default apiClient;
