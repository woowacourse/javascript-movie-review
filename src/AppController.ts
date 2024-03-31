import { createHeader } from './components/header/header';
import { MovieListWrapper } from './components/movieListWrapper/MovieListWrapper';
import { Dom } from './utils/Dom';

class AppController {
  #currentView;

  constructor() {
    this.#currentView = new MovieListWrapper('지금 인기 있는 영화', 'popular');
  }

  async start() {
    const app = document.querySelector('#app');
    if (!app) return;
    const logoHandler: () => void = async () => {
      await this.#currentView.updateView('지금 인기 있는 영화', 'popular');
    };

    const inputSubmitHandler = async (inputValue: string) => {
      const input: HTMLInputElement = Dom.getElement(document, 'header .search-box > input');
      if (input.offsetWidth === 0) {
        Dom.getElement(document, 'header h1').classList.add('clicked-logo');
        Dom.getElement(document, 'header > .search-box').classList.add('clicked-form');
        Dom.getElement(document, 'header .search-box > input').classList.add('clicked-input');
        Dom.getElement(document, 'header').classList.add('clicked-header');
        return;
      }
      if (inputValue === '') return;
      await this.#currentView.updateView(`"${inputValue}" 검색 결과`, 'search', inputValue);
    };

    const header = createHeader(logoHandler, inputSubmitHandler);
    app.prepend(header);
    this.#currentView.create();
  }
}

export default AppController;
