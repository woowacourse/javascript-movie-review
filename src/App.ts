import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import FooterMessage from './components/FooterMessage';
import MovieUpdateController from './controller/MovieUpdateController';
import ModalController from './controller/ModalController';
import { ViewBundleType } from './types';
import { $ } from './utils/domSelector';

class App {
  private movieUpdateController: MovieUpdateController;
  private modalController: ModalController;
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
    this.movieUpdateController = new MovieUpdateController(this.components);
    this.modalController = new ModalController();
  }
}

export default App;
