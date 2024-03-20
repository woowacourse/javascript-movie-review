import MovieContainer from '../component/MovieContainer.js';
import MovieService from '../domain/MovieService.ts';
import createHeader from '../component/Header.js';
import PageNumberManager from '../domain/pageNumberManager.ts';
import { $ } from '../util/selector.js';

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
      handleMoreButton: () => this.addMovieList(),
    });
  }

  async init() {
    createHeader();
    $('.search-button').addEventListener('clickSearchButton', () => this.makeSearchPage());
    await this.addMovieList();
  }

  async addMovieList() {
    const movieList = await this.fetchMovieList();
    this.#movieContainer.replaceSkeletonListToData(movieList);
  }

  async fetchMovieList() {
    if (this.#searchKeyword !== '') {
      const movieList = await this.#movieService.fetchSearchResult({
        pageNumber: this.#pageNumberManager.get('search'),
        query: this.#searchKeyword,
      });
      this.#pageNumberManager.add('search');
      this.#pageNumberManager.clear('popular');

      return movieList;
    }
    const movieList = await this.#movieService.fetchPopularMovieList(this.#pageNumberManager.get('popular'));
    this.#pageNumberManager.add('popular');
    this.#pageNumberManager.clear('search');

    return movieList;
  }

  setSearchKeyword() {
    this.#searchKeyword = $('div.search-box > input').value;
  }

  makeSearchPage() {
    this.#pageNumberManager.clear('search');

    this.setSearchKeyword();
    if (this.#searchKeyword === '') return alert('입력하라고...');

    this.#movieContainer.clearMovieList();
    this.#movieContainer.pushMoreSkeletonList();
    this.#movieContainer.setTitle(`"${this.#searchKeyword}" 검색 결과`); // 검색어 넣기
    this.addMovieList();
  }
}
