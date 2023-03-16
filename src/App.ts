import { $ } from './utils/domSelector';
import NavBar from './components/NavBar';
import MovieListContainer from './components/MovieListContainer';
import MovieListContent from './components/MovieListContent';

class App {
  constructor() {
    this.render();
  }

  render() {
    $<HTMLDivElement>('#app').insertAdjacentHTML('afterbegin', NavBar.template());
    $<HTMLElement>('main').insertAdjacentHTML('afterbegin', MovieListContainer.template());
    MovieListContent.loadMovies();
    this.initEvents();
  }

  initEvents() {
    NavBar.onSubmit();
    MovieListContainer.onClick();
  }
}

new App();
