import { getMovies, getSearchMovie } from './api';
import { PageStatusType } from '../utils/type';
import MovieData from './movieData';

class PageData {
  #currentPage: number;
  #totalPage: number;
  #recentKeyword: string | null;
  #pageStatus: PageStatusType;

  constructor() {
    this.#currentPage = 1;
    this.#totalPage = Infinity;
    this.#recentKeyword = null;
    this.#pageStatus = 'popular';
  }

  plusCurrentPage() {
    this.#currentPage++;
  }

  resetCurrentPage() {
    this.#currentPage = 1;
  }

  changePageStatus(callPage: PageStatusType) {
    this.#pageStatus = callPage;
  }

  getPageStatus() {
    return this.#pageStatus;
  }

  setRecentKeyword(keyword: string | null) {
    this.#recentKeyword = keyword;
  }

  getRecentKeyword() {
    return this.#recentKeyword;
  }

  setTotalPage(totalPage: number) {
    this.#totalPage = totalPage;
  }

  moreTotalPageThanCurrentPage() {
    return this.#currentPage <= this.#totalPage;
  }

  async useMovie() {
    if (this.#recentKeyword === null) {
      const { page, results, total_pages } = await getMovies(this.#currentPage);

      MovieData.addMovieData(results);

      return { values: { page, results, total_pages } };
    }

    const { page, results, total_pages } = await getSearchMovie(
      this.#recentKeyword,
      this.#currentPage
    );

    MovieData.addMovieData(results);

    return { values: { page, results, total_pages } };
  }
}

export default new PageData();
