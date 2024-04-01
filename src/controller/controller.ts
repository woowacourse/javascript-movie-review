import MovieContainer from '../component/MovieContainer';
import MovieService from '../domain/MovieService';
import createHeader from '../component/Header';
import PageManager from '../domain/pageManager';
import { $ } from '../util/selector';
import renderToast from '../component/toast/toast.js';
import { setMainTitleText } from '../component/setMainTitleText';

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
    this.attachInfiniteScroll();
  }

  private attachInfiniteScroll() {
    const skeleton$ = $('.item-view .observer'); // 관찰할 대상(요소)
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      // TODO: isLoading 빼고도 정상 동작하는지 확인
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isLoading) {
          this.addMovieList();
        }
      });
    }, options);
    observer.observe(skeleton$);
  }

  async init() {
    createHeader();
    $('form.search-box').addEventListener('clickSearchButton', () => this.makeSearchPage());
    $('header > img.logo').addEventListener('logoClickEvent', () => this.makePopularPage());
  }

  async addMovieList() {
    if (this.isLoading) return;

    this.isLoading = true;
    const moviePageData = await this.fetchMoviePageData();
    this.isLoading = false;

    if (!moviePageData) return;

    this.movieContainer.pushNewMovieList(moviePageData);
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

  makeSearchPage() {
    this.pageManager.changePage('search');
    this.setSearchKeyword();

    if (this.searchKeyword === '') {
      renderToast('검색어를 입력해주세요.');
      return;
    }

    this.movieContainer.clearMovieList();
    setMainTitleText('search', this.searchKeyword);

    this.addMovieList();
  }

  makePopularPage() {
    this.pageManager.changePage('popular');
    this.movieContainer.clearMovieList();
    setMainTitleText('popular');

    this.searchKeyword = '';
    $<HTMLFormElement>('form.search-box').reset();

    this.addMovieList();
  }
}
