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
  private movieService;
  private movieContainer;
  private isLoading = false;

  constructor() {
    this.searchKeyword = '';

    this.pageManager = new PageManager();
    this.movieService = new MovieService();
    this.movieContainer = new MovieContainer({
      handleMoreList: () => this.addMovieList(),
    });

    setMainTitleText('popular');
    this.attachInfiniteScroll();
  }

  private attachInfiniteScroll() {
    const skeleton$ = $('.item-view .infinite-scroll-observer'); // 관찰할 대상(요소)
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
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
    this.movieContainer.pushNewMovieList(moviePageData);
  }

  async fetchMoviePageData() {
    console.log('hi');
    const isSearching = this.searchKeyword !== '';
    const pageNumber = this.pageManager.getPage();

    const moviePageData = await (isSearching
      ? this.movieService.fetchSearchResult({
          pageNumber,
          query: this.searchKeyword,
        })
      : this.movieService.fetchPopularMovieList(pageNumber));

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
