import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { RENDER_MODE } from './constants';
import Modal from './components/Modal';
import RatingService from './service/RatingService';

export const Store = {
  keyword: '',
  page: 1,
  lastPage: Infinity,
};

export const ratingService = new RatingService({});

class App {
  constructor() {
    const $app = document.querySelector('#app');

    this.header = new Header($app);
    this.movieList = new MovieList($app);
    this.modal = new Modal($app);

    this.bindEvent();
  }

  bindEvent() {
    this.header.bindEvent(this.onSubmitSearch.bind(this));
    this.movieList.bindEvent(this.insertModalContent.bind(this));
  }

  insertModalContent({ title, content }) {
    this.modal.renderModal({ title, content });
  }

  async onSubmitSearch() {
    this.movieList.removeMovieCards();
    this.movieList.renderTitle(`"${Store.keyword}" 검색결과`);
    this.movieList.renderMode = RENDER_MODE.SEARCH;
    await this.movieList.renderNewContent();
  }
}

new App();
