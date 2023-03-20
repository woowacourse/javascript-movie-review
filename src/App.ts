import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';
import UpdateController from './controller/UpdateController';
import ButtonController from './controller/ButtonController';
import { ViewBundleType } from './types';
import { $ } from './utils/domSelector';

class App {
  private updateController!: UpdateController;
  private buttonController!: ButtonController;
  private components: ViewBundleType = {
    header: new Header($('header')),
    movieList: new MovieList({
      parentElement: $('.item-view'),
      listTitle: '지금 인기있는 영화 🎬',
    }),
    movieFetcher: new MovieFetcher(),
    loadMoreButton: new LoadMoreButton({ parentElement: $('.item-view'), name: '더 보기' }),
  };

  constructor() {
    this.updateController = new UpdateController(this.components);
    this.buttonController = new ButtonController(
      this.components,
      (updateMode: string, keyword: string = '') =>
        this.#onFetchAndUpdateMovieList(updateMode, keyword),
    );
  }

  #onFetchAndUpdateMovieList(updateMode: string, keyword: string = '') {
    this.updateController.fetchAndUpdateMovieList(updateMode, keyword);
  }
}

export default App;
