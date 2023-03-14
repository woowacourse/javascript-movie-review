import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';
import Movies from './domain/Movies';
import type { Movie } from './types/movie';

class App {
  #app: HTMLDivElement | null;

  #movies: Movies;

  #title: string | undefined;

  constructor() {
    this.#app = document.querySelector<HTMLDivElement>('#app');
    this.#movies = new Movies();
    this.#movies.init();
  }

  async render() {
    if (this.#app === null) return;

    await this.#movies.init();

    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        ${MovieCardSection.template(this.#movies.get(), 'this.#title')}
      </main>
    `;
    return this;
  }

  setEvent() {}
}

export default App;
