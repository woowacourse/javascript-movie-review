import { getMovies, getSearchMovie } from './api';
import { PageStatusType } from '../utils/type';

class PageData {
  #moviePage: number;
  #totalPage: number;
  #recentKeyword: string | null;
  #pageStatus: PageStatusType;
  #observer: IntersectionObserver | undefined;

  constructor() {
    this.#moviePage = 1;
    this.#totalPage = Infinity;
    this.#recentKeyword = null;
    this.#pageStatus = 'popular';
  }

  plusPage() {
    this.#moviePage++;
  }

  resetPage() {
    this.#moviePage = 1;
  }

  getMoviePage() {
    return this.#moviePage;
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

  async useMovie(keyword: string | null) {
    if (keyword === null) {
      // const { page, results, total_pages } = await gethMovie();

      const { page, results, total_pages } = await getMovies(this.#moviePage);

      return { values: { page, results, total_pages } };
    }

    // const { page, results, total_pages } = await getSearchMovie();
    const { page, results, total_pages } = await getSearchMovie(keyword, this.#moviePage);
    this.#recentKeyword = keyword;

    return {
      values: { page, results, total_pages },
    };
  }

  setObserver(callback: Function, elem: HTMLElement) {
    this.#observer = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting && this.#moviePage <= this.#totalPage) {
        console.log(this.#moviePage, this.#totalPage);
        callback();
      }
      return;
    });

    this.#observer.observe(elem);
  }
}

export default new PageData();
