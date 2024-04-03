import MovieContainer from '../component/MovieContainer';
import MovieService from '../domain/MovieService';
import createHeader from '../component/Header';
import PageManager from '../domain/pageManager';
import { $ } from '../util/selector';
import renderToast from '../component/toast/toast.js';
import { setMainTitleText } from '../component/setMainTitleText';
import startInfiniteScroll from '../util/startInfiniteScroll';

export class App {
  private searchKeyword;
  private pageManager;
  private api;
  private movieContainer;
  private isLoading = false;

  constructor() {
    this.searchKeyword = '';

    this.pageManager = new PageManager();
    this.api = new MovieService('TMDB');
    this.movieContainer = new MovieContainer();

    setMainTitleText('popular');

    this.addMovieList(true);
  }

  async init() {
    createHeader();
    $('form.search-box').addEventListener('clickSearchButton', () => this.makeSearchPage());
    $('header > img.logo').addEventListener('logoClickEvent', () => this.makePopularPage());
  }

  async addMovieList(isStart: boolean) {
    if (this.isLoading) return;

    this.isLoading = true;
    const moviePageData = await this.fetchMoviePageData();
    this.isLoading = false;

    if (!moviePageData) return;

    this.movieContainer.pushNewMovieList(moviePageData);

    if (isStart) this.attachInfiniteScroll();
  }

  async fetchMoviePageData() {
    const isSearching = this.searchKeyword !== '';
    const pageNumber = this.pageManager.getPage();

    const moviePageData = await (isSearching
      ? this.api.fetchSearchResult({
          query: this.searchKeyword,
          currentPage: pageNumber,
        })
      : this.api.fetchPopularMovieList(pageNumber));

    this.pageManager.addPage();

    return moviePageData;
  }

  setSearchKeyword() {
    this.searchKeyword = $<HTMLInputElement>('form.search-box > input').value;
  }

  async makeSearchPage() {
    this.pageManager.changePage('search');
    this.setSearchKeyword();

    if (this.searchKeyword === '') {
      renderToast('검색어를 입력해주세요.');
      return;
    }

    this.movieContainer.clearMovieList();
    setMainTitleText('search', this.searchKeyword);

    await this.addMovieList(false);

    this.attachInfiniteScroll();
  }

  async makePopularPage() {
    this.pageManager.changePage('popular');
    this.movieContainer.clearMovieList();
    setMainTitleText('popular');

    this.searchKeyword = '';
    $<HTMLFormElement>('form.search-box').reset();

    await this.addMovieList(false);
    this.attachInfiniteScroll();
  }

  attachInfiniteScroll() {
    const observer$ = $('.skeleton');
    startInfiniteScroll(this.addMovieList.bind(this), observer$);
  }
}
