import MovieContainer from '../component/MovieContainer.js';
import MovieService from '../domain/MovieService.ts';
import createHeader from '../component/Header.js';
import PageNumberManager from '../domain/pageNumberManager.ts';
import { $ } from '../util/selector.js';
import toast from '../component/toast/toast.js';
import { MOVIE_LIST_TYPE } from '../constant/config';
import ERROR_MESSAGE from '../constant/errorMessage.ts';

export class App {
  #searchKeyword;
  #tryCount;
  #pageNumberManager;
  #movieService;
  #movieContainer;

  constructor() {
    this.#searchKeyword = '';
    this.#tryCount = 0;
    this.#pageNumberManager = new PageNumberManager();
    this.#pageNumberManager.setPageType(MOVIE_LIST_TYPE.popular.type);

    this.#movieService = new MovieService();
    this.#movieContainer = new MovieContainer({
      title: MOVIE_LIST_TYPE.popular.title,
      handleMoreButton: () => this.addMovieList(),
    });
  }

  async init() {
    createHeader();
    $('form.search-box').addEventListener('clickSearchButton', () => this.handleSearchButtonClick());
    $('header > img.logo').addEventListener('logoClickEvent', () => this.handleLogoClick());

    await this.addMovieList();
  }

  async addMovieList() {
    try {
      this.#movieContainer.createSkeletonList();
      const moviePageData = await this.fetchMoviePageData();
      this.#movieContainer.fillMovieDataToSkeletonList(moviePageData);
      this.#pageNumberManager.increase();
      this.#tryCount = 0;
    } catch (error) {
      this.handleRetryAddMovieList(error.message);
    }
  }

  handleLogoClick() {
    this.clearAndResetToPopularPage();
    this.addMovieList();
  }

  handleSearchButtonClick() {
    this.setSearchKeyword();
    if (this.#searchKeyword) {
      this.makeSearchPage();
    }
  }

  handleRetryAddMovieList(errorMessage) {
    toast(errorMessage);
    this.#movieContainer.removeSkeleton();
    this.#tryCount += 1;

    if (this.#tryCount > 5) {
      toast(ERROR_MESSAGE.RETRY_LIMIT_EXCEEDED);
    } else {
      this.#movieContainer.createRetryButton(() => this.addMovieList());
    }
  }

  clearAndResetToPopularPage() {
    this.#movieContainer.clearMovieList();
    this.#movieContainer.setTitle(MOVIE_LIST_TYPE.popular.title);
    this.#pageNumberManager.setPageType(MOVIE_LIST_TYPE.popular.type);
    this.resetSearchKeyword();
  }

  resetSearchKeyword() {
    this.#searchKeyword = '';
    $('form.search-box').reset();
  }

  async fetchMoviePageData() {
    const isSearching = this.#searchKeyword !== '';
    const listType = isSearching ? MOVIE_LIST_TYPE.search.type : MOVIE_LIST_TYPE.popular.type;
    const pageNumber = this.#pageNumberManager.getPageNumber();
    const moviePageData = await this.#movieService.fetchMovieData({
      listType,
      pageNumber,
      searchKeyword: this.#searchKeyword,
    });
    return moviePageData;
  }

  setSearchKeyword() {
    const searchKeyword = $('form.search-box > input').value.trim();
    if (!searchKeyword) {
      toast(ERROR_MESSAGE.SEARCH_KEYWORD_EMPTY);
      return;
    }
    this.#searchKeyword = searchKeyword;
  }

  makeSearchPage() {
    this.#pageNumberManager.setPageType(MOVIE_LIST_TYPE.search.type);

    this.setSearchKeyword();
    this.#movieContainer.clearMovieList();
    this.#movieContainer.setTitle(MOVIE_LIST_TYPE.search.title(this.#searchKeyword));

    this.addMovieList();
  }
}
