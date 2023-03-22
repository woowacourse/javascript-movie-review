import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';
import MovieCardList from './components/MovieCardSection/MovieCardList';
import { isCustomErrorMessage } from './constants/message';
import { ID } from './constants/selector';
import Movies from './domain/Movies';
import type { Movie } from './types/movie';
import { $ } from './utils/dom';

class App {
  #app: HTMLDivElement;

  #movies: Movies;

  constructor() {
    this.#app = $<HTMLDivElement>(`#${ID.APP}`);
    this.#movies = new Movies();
  }

  async init() {
    this.render();

    try {
      const results = await this.#movies.init();
      this.paint(results);
    } catch (error) {
      if (isCustomErrorMessage(error)) {
        MovieCardSection.renderErrorMessage(error);
      }
    } finally {
      this.setEvent();
    }
  }

  render() {
    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        ${MovieCardSection.template()}
      </main>
    `;
  }

  paint(movies: Movie[]) {
    MovieCardList.paint(movies);
  }

  setEvent() {
    Header.setEvent(this.#movies);
    MovieCardSection.setEvent(this.#movies);
  }
}

export default App;
