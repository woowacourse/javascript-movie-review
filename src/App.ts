import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';
import MovieCardList from './components/MovieCardSection/MovieCardList';
import { ID } from './constants/selector';
import Movies from './domain/Movies';
import type { Movie } from './types/movie';

class App {
  #app: HTMLDivElement | null;

  #movies: Movies;

  constructor() {
    this.#app = document.querySelector<HTMLDivElement>(`#${ID.APP}`);
    this.#movies = new Movies();
  }

  async init() {
    this.render();

    try {
      const results = await this.#movies.init();

      if (typeof results === 'string') {
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
    if (this.#app === null) return;

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
