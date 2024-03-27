import { LOGO } from './resource/index';
import { $ } from './utils/dom';

import Header from './components/Header/Header';
import Title from './components/Title/Title';
import SearchBox from './components/SearchBox/SearchBox';
import MovieListSection from './components/MovieListSection/MovieListSection';

import MovieController from './controller/MovieController';

class MovieApp {
  #app = document.getElementById('app');
  #movieController;

  constructor() {
    this.#movieController = new MovieController();
  }

  init() {
    if (!(this.#app instanceof HTMLElement)) {
      return;
    }

    this.#app.appendChild(this.#setHeader());
    this.#app.appendChild(this.#setMain());
    this.#movieController.render('');

    this.#addViewMoreButtonClick();
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
    const movieListSection = MovieListSection();

    main.appendChild(movieListSection);

    return main;
  }

  #addViewMoreButtonClick() {
    $('.view-more-button')?.addEventListener('click', (event) =>
      this.#movieController.handleViewMoreButtonClick(event.target as HTMLButtonElement),
    );
  }

  #onSearchHandler() {
    const searchInput = $('#search-text') as HTMLInputElement;

    this.#movieController.render(searchInput.value);
    searchInput.value = '';
  }

  #onHomeButtonClick() {
    this.#movieController.render();
  }
}

export default MovieApp;
