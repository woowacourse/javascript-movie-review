import MovieContainer from '../component/MovieContainer';
import MovieService from '../domain/MovieService';
import createHeader from '../component/Header.js';
import PageManager from '../domain/pageManager';
import { $ } from '../util/selector';
import renderToast from '../component/toast/toast.js';
import { RetryLimitError, retryLimiter } from '../util/retryLimiter';
import { setMainTitleText } from '../component/setMainTitleText';

export class App {
  #searchKeyword;
  private pageManager;
  #movieService;
  #movieContainer;

  constructor() {
    this.#searchKeyword = '';

    this.pageManager = new PageManager();
    this.#movieService = new MovieService();
    this.#movieContainer = new MovieContainer({
      handleMoreList: () => this.addMovieList(),
    });
  }

  async init() {
    createHeader();
    $('form.search-box').addEventListener('clickSearchButton', () => this.makeSearchPage());
    $('header > img.logo').addEventListener('logoClickEvent', () => this.makePopularPage());

    this.makePopularPage();
  }

  async addMovieList() {
    const moviePageData = await this.fetchMoviePageData();
    this.#movieContainer.pushNewMovieList(moviePageData);
  }

  async fetchMoviePageData() {
    const isSearching = this.#searchKeyword !== '';
    const pageNumber = this.pageManager.getPage();

    const moviePageData = await (isSearching
      ? this.#movieService.fetchSearchResult({
          pageNumber,
          query: this.#searchKeyword,
        })
      : this.#movieService.fetchPopularMovieList(pageNumber));

    this.pageManager.addPage();

    return moviePageData;
  }

  setSearchKeyword() {
    this.#searchKeyword = $<HTMLInputElement>('form.search-box > input').value;
  }

  makeSearchPage() {
    this.pageManager.changePage('search');
    this.#movieContainer.clearMovieList();

    this.setSearchKeyword();
    if (this.#searchKeyword === '') {
      renderToast('검색어를 입력해주세요.');
      return;
    }

    setMainTitleText('search', this.#searchKeyword);
    this.addMovieList();
  }

  makePopularPage() {
    this.pageManager.changePage('popular');
    this.#movieContainer.clearMovieList();
    setMainTitleText('popular');

    this.#searchKeyword = '';
    $<HTMLFormElement>('form.search-box').reset();

    this.addMovieList();
  }
}
