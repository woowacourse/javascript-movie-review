import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';
import MovieCardList from './components/MovieCardSection/MovieCardList';
import { ERROR_MESSAGE } from './constants';
import { ID } from './constants/selector';
import Movies from './domain/Movies';
import type { Movie, ErrorMessage } from './types/movie';

class App {
  #app: HTMLDivElement;

  #movies: Movies;

  constructor() {
    this.#app = document.querySelector(`#${ID.APP}`) as HTMLDivElement;
    this.#movies = new Movies();
  }

  async init() {
    this.render();

    try {
      const results = await this.#movies.init();

      if (results === ERROR_MESSAGE.DATA_LOAD) {
        throw new Error(results);
      }

      this.paint(results);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
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
    Header.setEvent(this.#movies, this.#app);
    MovieCardSection.setEvent(this.#movies, this.#app);
  }
}

export default App;
