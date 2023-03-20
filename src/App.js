import Header from './components/Header';
import MovieList from './components/MovieList';

import { popularMovieDataFetchFuncGenerator, searchedMovieDataFetchFuncGenerator } from './api/get';

import { $ } from './utils';

export default class App {
  #getMovieMetaData;

  #header;
  #movieList;

  constructor() {
    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();

    this.#header = new Header($('#app'), {
      onClickMainLogo: this.renderPopularMovieList.bind(this),
      onSubmitSearchForm: this.renderSearchedMovieList.bind(this),
    });
    this.#movieList = new MovieList($('main'), { onClickMoreButton: this.renderMovieList.bind(this) });

    this.initialRender();
  }

  async initialRender() {
    this.#header.render();
    this.#movieList.render('popular');

    this.#movieList.load(await this.#getMovieMetaData());
  }

  async renderPopularMovieList() {
    this.assignPopularMovieDataFetchFunc();
    this.#movieList.render('popular');
    this.#movieList.showSkeletonList();
    this.#movieList.load(await this.#getMovieMetaData());
  }

  async renderSearchedMovieList(query) {
    this.assignSearchedMovieDataFetchFunc(query);
    this.#movieList.render('search', query);
    this.#movieList.showSkeletonList();
    this.#movieList.load(await this.#getMovieMetaData());
  }

  async renderMovieList() {
    this.#movieList.showSkeletonList();
    this.#movieList.load(await this.#getMovieMetaData());
  }

  assignPopularMovieDataFetchFunc() {
    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();
  }

  assignSearchedMovieDataFetchFunc(query) {
    this.#getMovieMetaData = searchedMovieDataFetchFuncGenerator(query);
  }
}
