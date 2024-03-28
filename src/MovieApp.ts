import { LOGO } from './resource/index';
import { $ } from './utils/dom';

import Header from './components/Header/Header';
import Title from './components/Title/Title';
import SearchBox from './components/SearchBox/SearchBox';
import MovieListSection from './components/MovieListSection/MovieListSection';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import MovieDetail from './components/MovieDetail/MovieDetail';

import MovieController from './controller/MovieController';

class MovieApp {
  #app = document.getElementById('app');
  #movieController;
  #modal;

  constructor() {
    this.#movieController = new MovieController();
    this.#modal = new ModalWrapper();
  }

  init() {
    if (!(this.#app instanceof HTMLElement)) {
      return;
    }

    this.#app.appendChild(this.#setHeader());
    this.#app.appendChild(this.#setMain());
    this.#app.appendChild(this.#modal.element);
    this.#movieController.render('');
  }

  #setHeader() {
    const logo = this.#setLogo();
    const title = Title({ element: logo, onClick: () => this.#onHomeButtonClick() });
    const searchBox = SearchBox({ searchHandler: () => this.#onSearchHandler() });
    const header = Header({ title: title, searchBox: searchBox });

    return header;
  }

  #setLogo() {
    const logo = document.createElement('img');

    logo.src = LOGO;
    logo.setAttribute('alt', 'MovieList 로고');

    return logo;
  }

  #setMain() {
    const main = document.createElement('main');
    const movieListSection = MovieListSection({
      onMovieClick: (event: MouseEvent) => this.#onMovieClick(event),
    });

    main.appendChild(movieListSection);

    return main;
  }

  #onSearchHandler() {
    const searchInput = $('#search-text') as HTMLInputElement;

    this.#movieController.render(searchInput.value);
    searchInput.value = '';
  }

  #onHomeButtonClick() {
    this.#movieController.render();
  }

  async #onMovieClick(event: MouseEvent) {
    const target = event.target as Element;
    const li = target.closest('li.movie-item') as HTMLLIElement;
    if (!li) return;

    this.#modal.toggle();

    const movieId = Number(li.dataset.movieId);
    const data = await this.#movieController.handleMovieClick(movieId);
    const movieDetail = MovieDetail({
      data,
      onCloseButtonClick: () => this.#modal.toggle(),
    });

    this.#modal.replaceContent(movieDetail);
  }
}

export default MovieApp;
