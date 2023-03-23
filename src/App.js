import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieCard from './components/MovieCard';
import DetailMovieCard from './components/DetailMovieCard';
import Modal from './components/Modal';

import { popularMovieDataFetchFuncGenerator, searchedMovieDataFetchFuncGenerator } from './api/get';

import { $ } from './utils';

export default class App {
  #getMovieMetaData;

  #header;
  #movieList;
  #modal;

  constructor() {
    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();

    this.#header = new Header($('#app'), {
      onClickMainLogo: this.renderPopularMovieList.bind(this),
      onSubmitSearchForm: this.renderSearchedMovieList.bind(this),
    });

    this.#modal = new Modal($('#app'), DetailMovieCard);
    this.#movieList = new MovieList($('main'), {
      onClickMoreButton: this.renderMovieList.bind(this),
      onClickCard: this.#modal.openModal.bind(this.#modal),
    });

    this.initialRender();
  }

  async initialRender() {
    this.#header.render();
    this.#movieList.render();
    this.#movieList.showSkeletonList();
    this.#movieList.renderListContent(await this.#getMovieMetaData());
    this.#modal.render();
  }

  async renderPopularMovieList() {
    this.assignPopularMovieDataFetchFunc();
    this.#movieList.render();
    this.#movieList.showSkeletonList();
    this.#movieList.renderListContent(await this.#getMovieMetaData());
  }

  async renderSearchedMovieList(query) {
    this.assignSearchedMovieDataFetchFunc(query);
    this.#movieList.render(query);
    this.#movieList.showSkeletonList();
    this.#movieList.renderListContent(await this.#getMovieMetaData());
  }

  async renderMovieList() {
    this.#movieList.showSkeletonList();
    this.#movieList.renderListContent(await this.#getMovieMetaData());
  }

  assignPopularMovieDataFetchFunc() {
    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();
  }

  assignSearchedMovieDataFetchFunc(query) {
    this.#getMovieMetaData = searchedMovieDataFetchFuncGenerator(query);
  }
}
