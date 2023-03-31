import Header from './components/Header';
import MovieDetailsModal from './components/MovieDetailsModal';
import MovieList from './components/MovieList';
import { Movie } from './type/Movie';
import { $ } from './utils';

export default class App {
  #components: {
    header: Header;
    movieList: MovieList;
    movieDetailsModal?: MovieDetailsModal;
  };

  constructor() {
    this.#components = {
      header: new Header(<Element>$('#app'), {
        renderPopularMovieList: this.renderPopularMovieList.bind(this),
        renderSearchedMovieList: this.renderSearchedMovieList.bind(this),
      }),
      movieList: new MovieList(<Element>$('main'), this.renderDetailsModal.bind(this)),
    };

    this.initialRender();
  }

  initialRender() {
    this.#components.header.render();
    this.#components.movieList.render();
  }

  renderPopularMovieList() {
    this.#components.movieList.setPopularMovieDataFetchFunc();
    this.#components.movieList.render();
  }

  renderSearchedMovieList(query: string) {
    this.#components.movieList.setSearchedMovieDataFetchFunc(query);
    this.#components.movieList.render(query);
  }

  renderDetailsModal(movie: Movie) {
    if (!this.#components.movieDetailsModal) {
      this.#components.movieDetailsModal = new MovieDetailsModal(<Element>$('#app'), movie);
    }

    this.#components.movieDetailsModal.movie = movie;
    this.#components.movieDetailsModal.render();
  }
}
