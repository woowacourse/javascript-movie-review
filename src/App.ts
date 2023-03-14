import Header from './components/Header';
import MovieCardSection from './components/MovieCardSection';
import type { Movie } from './types/movie';

class App {
  #app: HTMLDivElement | null;

  #list: Movie[] | undefined;

  #title: string | undefined;

  constructor() {
    this.#app = document.querySelector<HTMLDivElement>('#app');
  }

  render() {
    if (this.#app === null) return;

    this.#app.innerHTML = `
      ${Header.template()}
      <main>
      </main>
    `;
    //${MovieCardSection.template(this.#list, this.#title)}
    return this;
  }

  setEvent() {}
}

export default App;
