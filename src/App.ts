import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';
import MovieCardList from './components/MovieCardSection/MovieCardList';
import Movies from './domain/Movies';
import { Movie } from './types/movie';

class App {
  #app: HTMLDivElement | null;

  #movies: Movies;

  constructor() {
    this.#app = document.querySelector<HTMLDivElement>('#app');
    this.#movies = new Movies();
  }

  async init() {
    this.render();
    await this.#movies.init();
    this.paint(this.#movies.get());
    this.setEvent();
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
