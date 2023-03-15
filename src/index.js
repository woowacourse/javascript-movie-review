import './style/reset';
import './style/common';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { getPopularMovies } from './service/movie';

export const Store = {
  keyword: '',
};

class App {
  constructor() {
    const $app = document.querySelector('#app');
    this.header = new Header($app).init();
    this.movieList = new MovieList($app).init();
  }

  async init() {
    this.header.bindEvent(this.onSubmitSearch.bind(this));
    this.movieList.bindEvent();

    const { results } = await getPopularMovies({ page: 1 });
    this.movieList.renderMovieCards(results);
  }

  onSubmitSearch(results) {
    this.movieList.renderMode = 'search';
    this.movieList.removeMovieCards();
    this.movieList.renderMovieCards(results);
  }
}

const app = new App();
app.init();
