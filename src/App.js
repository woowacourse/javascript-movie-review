import Header from './components/Header';
import MovieList from './components/MovieList';

import MovieListMaker from './domain/MovieListMaker';

import { $, getParsedData } from './utils';

export default class App {
  #header;
  #movieList;

  constructor() {
    this.#header = new Header($('#app'));
    this.#movieList = new MovieList($('main', this.getPopularMovieList.bind(this)));

    this.initialRender();
    this.setEvent();
  }

  initialRender() {
    this.#header.render();
    this.#movieList.render();
    this.#movieList.renderMovieCards(this.getPopularMovieList());
  }

  async getPopularMovieList() {
    const url = `
    https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    const data = await getParsedData(url);
    const moviesData = data.results;
    const movieList = MovieListMaker(moviesData);

    return movieList;
  }

  setEvent() {
    $('#more-button').addEventListener('click', this.onClickMoreButton.bind(this));
  }

  onClickMoreButton() {
    this.#movieList.showSkeletonList();
    const movieList = this.getPopularMovieList();

    this.#movieList.renderMovieCards(movieList);
  }
}
