import Header from './components/Header/Header';
import MovieList from './components/MovieList/MovieList';
import Modal from './components/Modal/Modal';
import { popularMovieDataFetchFuncGenerator, searchedMovieDataFetchFuncGenerator, getDetailMovieData } from './api/get';
import PersonalVoteHandler from './domain/PersonalVoteHandler';
import { $, storage } from './utils';
import { PERSONAL_VOTE_KEY } from './constants/storageKey';

export default class App {
  #personalVoteHandler;

  #getMovieMetaData;

  #header;
  #movieList;
  #modal;

  constructor() {
    this.bindESCKeyDownEvent();
    this.bindWindowUnloadEvent();

    const personalVoteData = storage.getLocalStorage(PERSONAL_VOTE_KEY);
    this.#personalVoteHandler = new PersonalVoteHandler(personalVoteData);

    this.#getMovieMetaData = popularMovieDataFetchFuncGenerator();

    this.#header = new Header($('#app'), {
      onClickMainLogo: this.renderPopularMovieList.bind(this),
      onSubmitSearchForm: this.renderSearchedMovieList.bind(this),
    });
    this.#modal = new Modal($('#app'), {
      onClickVoteButton: this.#personalVoteHandler.updatePersonalVoteData.bind(this.#personalVoteHandler),
    });
    this.#movieList = new MovieList($('main'), {
      onObserveElement: this.renderMovieList.bind(this),
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
    const starCount = this.#personalVoteHandler.getStarCountById(movieId);

    this.#modal.renderContent({ id, title, posterPath, voteAverage, overview, genres }, starCount);
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

  bindWindowUnloadEvent() {
    window.addEventListener('beforeunload', () => {
      storage.setLocalStorage(PERSONAL_VOTE_KEY, this.#personalVoteHandler.getPersonalVoteData());
    });
  }
}
