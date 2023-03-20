import { $ } from '../utils';
import { getMovies, getSearchMovie, MovieInterface } from './api';

type PageStatusType = 'popular' | 'search';

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

    this.toggleMoreButton(results);

    return {
      values: { page, results },
    };
  }

  async useSearchedMovie(keyword: string) {
    const { page, results } = await getSearchMovie(keyword, this.#moviePage);
    this.#recentKeyword = keyword;

    this.toggleMoreButton(results);

    return {
      values: { page, results },
    };
  }

  toggleMoreButton(result: MovieInterface[]) {
    const moreButton = $('.view-more-button') as HTMLElement;

    if (result.length >= 20 && result.length > 0)
      return (moreButton.style.display = 'inline-block');
    return (moreButton.style.display = 'none');
  }
}

export default new PageData();
