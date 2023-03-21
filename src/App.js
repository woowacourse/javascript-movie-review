import Header from './components/Header';
import MovieList from './components/MovieList';

import { popularMovieDataFetchFuncGenerator, searchedMovieDataFetchFuncGenerator } from './api/get';

import { $ } from './utils';

export default class App {
  #getMovieData;

  #header;
  #movieList;

  constructor() {
    this.#getMovieData = popularMovieDataFetchFuncGenerator();

    this.#header = new Header($('#app'), {
      renderPopularMovieList: this.renderPopularMovieList.bind(this),
      renderSearchedMovieList: this.renderSearchedMovieList.bind(this),
    });
    this.#movieList = new MovieList($('main'), this.getMovieMetaData.bind(this));

    this.initialRender();
  }

  initialRender() {
    this.#header.render();
    this.#movieList.render('popular');
    this.#movieList.load();
  }

  renderPopularMovieList() {
    this.setPopularMovieDataFetchFunc();
    this.#movieList.render('popular');
    this.#movieList.load();
  }

  renderSearchedMovieList(query) {
    this.setSearchedMovieDataFetchFunc(query);
    this.#movieList.render('search', query);
    this.#movieList.load();
  }

  async getMovieMetaData() {
    const data = await this.#getMovieData();

    if (data.success === false) {
      return { errorCode: data.status_code };
    }

    const moviesData = data.results;
    const page = data.page;
    const totalPages = data.total_pages;

    return { moviesData, page, totalPages };
  }

  setPopularMovieDataFetchFunc() {
    this.#getMovieData = popularMovieDataFetchFuncGenerator();
  }

  setSearchedMovieDataFetchFunc(query) {
    this.#getMovieData = searchedMovieDataFetchFuncGenerator(query);
  }
}
