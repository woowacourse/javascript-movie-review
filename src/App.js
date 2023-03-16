import Header from './components/Header';
import MovieList from './components/MovieList';

import { popularMovieDataFetchFuncGenerator } from './api/get';

import { $ } from './utils';

export default class App {
  #getPopularMovieData;

  #header;
  #movieList;

  constructor() {
    this.#getPopularMovieData = popularMovieDataFetchFuncGenerator();

    this.#header = new Header($('#app'));
    this.#movieList = new MovieList($('main'), { getPopularMovieMetaData: this.getPopularMovieMetaData.bind(this) });

    this.initialRender();
  }

  initialRender() {
    this.#header.render();
    this.#movieList.render();
    this.#movieList.load();
  }

  async getPopularMovieMetaData() {
    const data = await this.#getPopularMovieData();

    const moviesData = data.results;
    const page = data.page;
    const totalPages = data.total_pages;

    return { moviesData, page, totalPages };
  }
}
