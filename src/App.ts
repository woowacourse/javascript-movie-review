import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import FooterMessage from './components/FooterMessage';
import UpdateController from './controller/UpdateController';
import ButtonController from './controller/ButtonController';
import ModalController from './controller/ModalController';
import { ViewBundleType } from './types';
import { $ } from './utils/domSelector';

class App {
  private updateController!: UpdateController;
  private buttonController!: ButtonController;
  private modalController!: ModalController;
  private components: ViewBundleType = {
    header: new Header($('header')),
    movieList: new MovieList({
      parentElement: $('.item-view'),
      listTitle: '지금 인기있는 영화 🎬',
    }),
    movieFetcher: new MovieFetcher(),
    footerMessage: new FooterMessage($('main')),
  };

  constructor() {
    this.updateController = new UpdateController(this.components);
    this.buttonController = new ButtonController(
      this.components,
      (updateMode: string, keyword: string = '') =>
        this.#onFetchAndUpdateMovieList(updateMode, keyword),
    );
    this.modalController = new ModalController();
  }

  #onFetchAndUpdateMovieList(updateMode: string, keyword: string = '') {
    this.updateController.fetchAndUpdateMovieList(updateMode, keyword);
  }
}

export default App;
