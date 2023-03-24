import Header from './components/Header';
import MovieList from './components/MovieList';
import Modal from './components/Modal';

import { popularMovieDataFetchFuncGenerator, searchedMovieDataFetchFuncGenerator, getDetailMovieData } from './api/get';

import { $ } from './utils';

export default class App {
  #getMovieMetaData;

  #header;
  #movieList;
  #modal;

  constructor() {
    this.bindESCKeyDownEvent();

    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();

    this.#header = new Header($('#app'), {
      onClickMainLogo: this.renderPopularMovieList.bind(this),
      onSubmitSearchForm: this.renderSearchedMovieList.bind(this),
    });

    this.#modal = new Modal($('#app'));
    this.#movieList = new MovieList($('main'), {
      onClickMoreButton: this.renderMovieList.bind(this),
      onClickCard: this.renderModalContent.bind(this),
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

  async renderModalContent(movieId) {
    const detailMovieData = await getDetailMovieData(movieId);

    if (!detailMovieData.isOk) {
      const { statusCode, statusMessage } = detailMovieData;
      this.#modal.renderErrorTemplate(statusCode, statusMessage);

      return;
    }

    const { id, title, posterPath, voteAverage, overview, genres } = detailMovieData;

    this.#modal.renderContent({ id, title, posterPath, voteAverage, overview, genres });
  }

  assignPopularMovieDataFetchFunc() {
    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();
  }

  assignSearchedMovieDataFetchFunc(query) {
    this.#getMovieMetaData = searchedMovieDataFetchFuncGenerator(query);
  }

  bindESCKeyDownEvent() {
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      this.#modal.clearContent();
      this.#modal.closeModal();
    });
  }
}
