import { LOGO } from './resource/index';

import Header from './components/Header/Header';
import Title from './components/Title/Title';
import SearchBox from './components/SearchBox/SearchBox';

import MovieList from './components/MovieList/MovieList';
import MovieContainer from './components/MovieContainer';

class MovieApp {
  #app = document.getElementById('app');

  init() {
    this.#app?.appendChild(this.#setHeader());
    this.#app?.appendChild(this.#setMain());

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
    const movieContainer = new MovieContainer();

    this.#app?.addEventListener('search', ((event: CustomEvent<string>) => {
      movieContainer.render(event.detail);
    }) as EventListener);

    this.#app?.addEventListener('home-click', () => {
      movieContainer.render();
    });
  }
}

export default MovieApp;
