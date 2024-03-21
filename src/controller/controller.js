import MovieContainer from '../component/MovieContainer.js';
import MovieService from '../domain/MovieService.ts';
import createHeader from '../component/Header.js';
import PageNumberManager from '../domain/pageNumberManager.ts';
import { $ } from '../util/selector.js';
import toast from '../component/toast/toast.js';
import { RetryLimitError, retryLimiter } from '../util/retryLimiter.ts';

export class App {
  #searchKeyword;
  #pageNumberManager;
  #movieService;
  #movieContainer;

  constructor() {
    this.#searchKeyword = '';

    this.#pageNumberManager = new PageNumberManager();
    this.#pageNumberManager.init('popular');
    this.#pageNumberManager.init('search');

    this.#movieService = new MovieService();
    this.#movieContainer = new MovieContainer({
      title: '지금 인기 있는 영화',
      handleMoreButton: () => this.addMovieList(1),
    });
  }

  async init() {
    createHeader();
    $('form.search-box').addEventListener('clickSearchButton', () => this.makeSearchPage());
    $('header > img.logo').addEventListener('logoClickEvent', () => {
      this.#movieContainer.clearMovieList();
      this.#movieContainer.setTitle('지금 인기 있는 영화');
      this.#pageNumberManager.clear('popular');
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
    } catch (error) {
      if (error instanceof RetryLimitError) return toast(error);

      this.#movieContainer.removeSkeleton();

      this.#movieContainer.createRetryButton(() => {
        this.addMovieList(tryCount + 1);
      });

      toast(error);
    }
  }

  async fetchMoviePageData() {
    const isSearching = this.#searchKeyword !== '';
    const mode = isSearching ? 'search' : 'popular';
    const otherMode = isSearching ? 'popular' : 'search';

    const pageNumber = this.#pageNumberManager.get(mode);

    const moviePageData = await (isSearching
      ? this.#movieService.fetchSearchResult({
          pageNumber,
          query: this.#searchKeyword,
        })
      : this.#movieService.fetchPopularMovieList(pageNumber));

    this.#pageNumberManager.add(mode);
    this.#pageNumberManager.clear(otherMode);

    return moviePageData;
  }

  setSearchKeyword() {
    this.#searchKeyword = $('form.search-box > input').value;
  }

  makeSearchPage() {
    this.#pageNumberManager.clear('search');

    this.setSearchKeyword();
    if (this.#searchKeyword === '') return toast('검색어를 입력해주세요.');

    this.#movieContainer.clearMovieList();
    this.#movieContainer.setTitle(`"${this.#searchKeyword}" 검색 결과`);

    this.addMovieList(1);
  }
}
