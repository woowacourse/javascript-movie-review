import MovieListContainer from './components/MovieListContainer';
import MovieListContent from './components/MovieListContent';
import NavBar from './components/NavBar';
import { $ } from './utils/domSelector';

class App {
  constructor() {
    this.render();
  }

  async render() {
    $<HTMLDivElement>('#app').insertAdjacentHTML('afterbegin', NavBar.render());
    $<HTMLElement>('main').insertAdjacentHTML('afterbegin', MovieListContainer.render());
    MovieListContent.loadMovies();
    this.initEvents();
  }

  initEvents() {
    NavBar.onSubmit();
    MovieListContainer.onClick();
  }
}

new App();
