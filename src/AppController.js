import Header from './components/header/header';
import MovieListWrapper from './components/movieListWrapper/MovieListWrapper';
import { VIEW_TYPE } from './constants/constant';
import view from './view/view';

class AppController {
  #currentView;

  constructor() {
    this.#currentView = new MovieListWrapper('지금 인기 있는 영화', VIEW_TYPE.POPULAR);
  }

  async start() {
    const app = document.querySelector('#app');

    const header = Header({
      onLogoClick: () => {
        this.#currentView = new MovieListWrapper('지금 인기 있는 영화', VIEW_TYPE.POPULAR);
        this.#currentView.create();
      },
      inputSubmitHandle: inputValue => {
        this.#currentView = new MovieListWrapper(`"${inputValue}" 검색 결과`, VIEW_TYPE.SEARCH, inputValue);
        this.#currentView.create();
      },
    });

    app.prepend(header);


    const movieList = await fetchPopularMovieList(this.#currentPage);
    this.updateMovieList(itemList, movieList.results);

    this.#currentView.create();
  }
}

export default AppController;
