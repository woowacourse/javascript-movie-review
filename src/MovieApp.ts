import { LOGO } from './resource/index';

import Header from './components/Header/Header';
import Title from './components/Title/Title';
import SearchBox from './components/SearchBox/SearchBox';

import MovieList from './components/MovieList/MovieList';
import MovieController from './controller/MovieController';
import { $ } from './utils/dom';

class MovieApp {
  #app = document.getElementById('app');
  #movieController;

  constructor() {
    this.#movieController = new MovieController();
  }

  init() {
    this.#app?.appendChild(this.#setHeader());
    this.#app?.appendChild(this.#setMain());
    this.#movieController.render('');

    this.#addEvents();
  }

  #setHeader() {
    const logo = document.createElement('img');
    logo.src = LOGO;
    logo.setAttribute('alt', 'MovieList 로고');

    const header = Header({ title: Title({ element: logo }), searchBox: SearchBox() });

    return header;
  }

  #setMain() {
    const main = document.createElement('main');
    const movieList = MovieList();

    main.appendChild(movieList);

    return main;
  }

  #addEvents() {
    this.#app?.addEventListener('search', ((event: CustomEvent<string>) => {
      this.#movieController.render(event.detail);
    }) as EventListener);

    this.#app?.addEventListener('home-click', () => {
      this.#movieController.render();
    });

    $('.view-more-button')?.addEventListener('click', (event) =>
      this.#movieController.handleViewMoreButtonClick(event.target as HTMLButtonElement),
    );
  }
}

export default MovieApp;
