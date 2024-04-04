import { clickedHeaderView, createHeader } from './components/header/header';
import { MovieListWrapper } from './components/movieListWrapper/MovieListWrapper';
import { Dom } from './utils/Dom';
import { setResizeEvent } from './utils/ResizeEvent';

class AppController {
  #currentView;

  constructor() {
    this.#currentView = new MovieListWrapper('지금 인기 있는 영화', 'popular');
    setResizeEvent();
  }

  async start() {
    const app = Dom.getElement(document, '#app');
    const logoHandler: () => void = async () => {
      await this.#currentView.updateView('지금 인기 있는 영화', 'popular');
    };

    const inputSubmitHandler = async (inputValue: string) => {
      const input: HTMLInputElement = Dom.getElement(document, 'header .search-box > input');
      if (input.offsetWidth === 0) {
        Dom.getElement(document, '.close-input').classList.add('clicked-close-input');
        clickedHeaderView();
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
