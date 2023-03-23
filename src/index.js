import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { RENDER_MODE } from './constants';

export const Store = {
  keyword: '',
  page: 1,
  lastPage: Infinity,
};

class App {
  constructor() {
    const $app = document.querySelector('#app');

    this.header = new Header($app);
    this.movieList = new MovieList($app);

    this.bindEvent();
  }

  bindEvent() {
    this.header.bindEvent(this.onSubmitSearch.bind(this));
  }

  async onSubmitSearch() {
    this.movieList.removeMovieCards();
    this.movieList.renderTitle(`"${Store.keyword}" 검색결과`);
    this.movieList.renderMode = RENDER_MODE.SEARCH;
    await this.movieList.renderNewContent();
    this.movieList.observeLastItem();
  }
}

new App();
