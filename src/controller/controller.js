import MovieContainer from '../component/MovieContainer.js';
import MovieService from '../domain/MovieService.ts';
import createHeader from '../component/Header.js';
import PageNumberManager from '../domain/pageNumberManager.ts';
import { $ } from '../util/selector.js';
import toast from '../component/toast/toast.js';
import { RetryLimitError, retryLimiter } from '../util/retryLimiter.ts';
import { MOVIE_LIST_TYPE } from '../constant/config';

export class App {
  #searchKeyword;
  #pageNumberManager;
  #movieService;
  #movieContainer;

  constructor() {
    this.#searchKeyword = '';
    this.#pageNumberManager = new PageNumberManager();
    this.#pageNumberManager.setPageType(MOVIE_LIST_TYPE.popular.type);

    this.#movieService = new MovieService();
    this.#movieContainer = new MovieContainer({
      title: MOVIE_LIST_TYPE.popular.title,
      handleMoreButton: () => this.addMovieList(1),
    });
  }

  async init() {
    createHeader();
    $('form.search-box').addEventListener('clickSearchButton', () => this.makeSearchPage());
    $('header > img.logo').addEventListener('logoClickEvent', () => {
      this.#movieContainer.clearMovieList();
      this.#movieContainer.setTitle(MOVIE_LIST_TYPE.popular.title);
      this.#pageNumberManager.setPageType(MOVIE_LIST_TYPE.popular.type);
      this.#searchKeyword = '';
      $('form.search-box').reset();

      this.addMovieList(1);
    });

    await this.addMovieList(1);
  }

  async addMovieList(tryCount) {
    try {
      retryLimiter(tryCount);
      this.#movieContainer.pushMoreSkeletonList();
      this.#movieContainer.removeRetryButton();
      const moviePageData = await this.fetchMoviePageData();
      this.#movieContainer.replaceSkeletonListToData(moviePageData);
      this.#pageNumberManager.increase();
    } catch (error) {
      this.handleRetryAddMovieList(error, tryCount);
    }
  }

  handleRetryAddMovieList(error, tryCount) {
    if (error instanceof RetryLimitError) return toast(error);

    this.#movieContainer.removeSkeleton();
    this.#movieContainer.createRetryButton(() => {
      this.addMovieList(tryCount + 1);
    });

    toast(error);
  }

  async fetchMoviePageData() {
    const isSearching = this.#searchKeyword !== '';
    const mode = isSearching ? MOVIE_LIST_TYPE.search.type : MOVIE_LIST_TYPE.popular.type;
    const pageNumber = this.#pageNumberManager.getPageNumber();

    const moviePageData = await this.fetchMovieData(mode, pageNumber, this.#searchKeyword);
    return moviePageData;
  }

  async fetchMovieData(mode, pageNumber, searchKeyword = '') {
    const fetchFunctions = {
      search: this.#movieService.fetchSearchResult.bind(this.#movieService),
      popular: this.#movieService.fetchPopularMovieList.bind(this.#movieService),
    };

    const fetchFunction = fetchFunctions[mode];
    const params = mode === MOVIE_LIST_TYPE.search.type ? { pageNumber, searchKeyword } : pageNumber;

    return fetchFunction(params);
  }

  setSearchKeyword() {
    const searchKeyword = $('form.search-box > input').value;
    if (!searchKeyword || searchKeyword === '') {
      return toast('검색어를 입력해주세요.');
    }
    this.#searchKeyword = $('form.search-box > input').value;
  }

  makeSearchPage() {
    this.#pageNumberManager.setPageType(MOVIE_LIST_TYPE.search.type);

    this.setSearchKeyword();
    this.#movieContainer.clearMovieList();
    this.#movieContainer.setTitle(`"${this.#searchKeyword}" 검색 결과`);

    this.addMovieList(1);
  }
}
