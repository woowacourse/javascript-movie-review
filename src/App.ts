import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';

import { MOVIE_STORAGE_ID } from './constants';
import { ID } from './constants/selector';
import ratedMovieStates from './states/ratedMovies';
import { $ } from './utils/dom';

class App {
  #app: HTMLDivElement;

  constructor() {
    this.#app = $<HTMLDivElement>(`#${ID.APP}`);
  }

  init() {
    this.render();
    MovieCardSection.render();
    this.setEvent();
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        ${MovieCardSection.template()}
      </main>
    `;
  }

  setEvent() {
    Header.setEvent();
    MovieCardSection.setEvent();

    window.addEventListener('beforeunload', () => {
      localStorage.setItem(MOVIE_STORAGE_ID, JSON.stringify(ratedMovieStates.getList()));
    });
  }
}

export default App;
