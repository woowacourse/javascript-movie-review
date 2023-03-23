import { getMovies, getSearchMovie } from './api';
import { PageStatusType } from '../utils/type';

class PageData {
  #moviePage: number;
  #recentKeyword: string;
  #pageStatus: PageStatusType;

  constructor() {
    this.#moviePage = 1;
    this.#recentKeyword = '';
    this.#pageStatus = 'popular';
  }

  plusPage() {
    this.#moviePage++;
  }
  resetPage() {
    this.#moviePage = 1;
  }
  changePageStatus(callPage: PageStatusType) {
    this.#pageStatus = callPage;
  }

  getPageStatus() {
    return this.#pageStatus;
  }
  getRecentKeyword() {
    return this.#recentKeyword;
  }

  async usePopularMovie() {
    const { page, results } = await getMovies(this.#moviePage);

    return {
      values: { page, results },
    };
  }

  async useSearchedMovie(keyword: string) {
    const { page, results } = await getSearchMovie(keyword, this.#moviePage);
    this.#recentKeyword = keyword;

    return {
      values: { page, results },
    };
  }
}

export default new PageData();
