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
  #timer: NodeJS.Timeout | null;

  constructor() {
    this.#components = {
      header: new Header(<Element>$('#app'), {
        renderPopularMovieList: this.renderPopularMovieList.bind(this),
        renderSearchedMovieList: this.renderSearchedMovieList.bind(this),
      }),
      movieList: new MovieList(<Element>$('main'), this.renderDetailsModal.bind(this)),
    };
    this.#timer = null;

    this.initialRender();
  }

  initialRender() {
    this.#components.header.render();
    this.#components.movieList.render();
    this.#components.movieList.load();

    window.addEventListener('scroll', this.infiniteScroll.bind(this), { passive: true });
  }

  renderPopularMovieList() {
    this.#components.movieList.setPopularMovieDataFetchFunc();
    this.#components.movieList.render();
    this.#components.movieList.load();
  }

  renderSearchedMovieList(query: string) {
    this.#components.movieList.setSearchedMovieDataFetchFunc(query);
    this.#components.movieList.render(query);
    this.#components.movieList.load();
  }

  renderDetailsModal(movie: Movie) {
    if (!this.#components.movieDetailsModal) {
      this.#components.movieDetailsModal = new MovieDetailsModal(<Element>$('#app'), movie);
    }

    this.#components.movieDetailsModal.movie = movie;
    this.#components.movieDetailsModal.render();
  }

  infiniteScroll() {
    const padding = 50;
    if (window.scrollY + window.innerHeight + padding < document.body.scrollHeight || this.#timer) return;

    this.#timer = setTimeout(() => {
      this.#timer = null;

      this.#components.movieList.load();
    }, 500);
  }
}
