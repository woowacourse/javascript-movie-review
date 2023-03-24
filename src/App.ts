import Header from './components/Header';
import MovieDetailsModal from './components/MovieDetailsModal';
import MovieList from './components/MovieList';
import { Movie } from './type/Movie';
import { $ } from './utils';

export default class App {
  #header;
  #movieList;
  #movieDetailsModal?: MovieDetailsModal;

  constructor() {
    this.#header = new Header(<Element>$('#app'), {
      renderPopularMovieList: this.renderPopularMovieList.bind(this),
      renderSearchedMovieList: this.renderSearchedMovieList.bind(this),
    });
    this.#movieList = new MovieList(<Element>$('main'), this.renderDetailsModal.bind(this));

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

  renderDetailsModal(movie: Movie) {
    if (!this.#movieDetailsModal) {
      this.#movieDetailsModal = new MovieDetailsModal(<Element>$('#app'), movie);
    }

    this.#movieDetailsModal.movie = movie;
    this.#movieDetailsModal.render();
  }
}
