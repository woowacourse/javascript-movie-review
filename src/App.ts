import Header from './components/Header';
import MovieList from './components/MovieList';
import { $ } from './utils';

export default class App {
  #header;
  #movieList;

  constructor() {
    this.#header = new Header(<Element>$('#app'), {
      renderPopularMovieList: this.renderPopularMovieList.bind(this),
      renderSearchedMovieList: this.renderSearchedMovieList.bind(this),
    });
    this.#movieList = new MovieList(<Element>$('main'));

    this.initialRender();
  }

  initialRender() {
    this.#header.render();
    this.#movieList.render();
    this.#movieList.load();
  }

  renderPopularMovieList() {
    this.#movieList.setPopularMovieDataFetchFunc();
    this.#movieList.render();
    this.#movieList.load();
  }

  renderSearchedMovieList(query: string) {
    this.#movieList.setSearchedMovieDataFetchFunc(query);
    this.#movieList.render(query);
    this.#movieList.load();
  }
}
