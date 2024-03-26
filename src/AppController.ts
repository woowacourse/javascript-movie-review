import { createHeader } from './components/header/header';
import { MovieListWrapper } from './components/movieListWrapper/MovieListWrapper';

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
      await this.#currentView.updateView(`"${inputValue}" 검색 결과`, 'search', inputValue);
    };

    const header = createHeader(logoHandler, inputSubmitHandler);
    app.prepend(header);
    this.#currentView.create();
  }
}

export default AppController;
