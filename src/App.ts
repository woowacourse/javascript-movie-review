import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';
import Movies from './domain/Movies';

class App {
  #app: HTMLDivElement | null;

  #movies: Movies;

  constructor() {
    this.#app = document.querySelector<HTMLDivElement>('#app');
    this.#movies = new Movies();
  }

  async init() {
    if (this.#app === null) return;

    await this.#movies.init();

    this.#app.innerHTML = `
      ${Header.template()}
      <main>
        ${MovieCardSection.template(this.#movies.get())}
      </main>
    `;

    this.setEvent();
  }

  setEvent() {
    Header.setEvent(this.#movies);
    MovieCardSection.setEvent(this.#movies);
  }
}

export default App;
