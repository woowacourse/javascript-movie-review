import { $ } from './utils/domSelector';
import NavBar from './components/NavBar';
import MovieListContainer from './components/MovieListContainer';
import MovieListContent from './components/MovieListContent';

class App {
  constructor() {
    this.render();
    MovieListContent.loadMovies();
    this.initEvents();
  }

  render() {
    $<HTMLDivElement>('#app').insertAdjacentHTML('afterbegin', NavBar.template());
    $<HTMLElement>('main').insertAdjacentHTML('afterbegin', MovieListContainer.template());
  }

  initEvents() {
    NavBar.onSubmit();
    MovieListContainer.onClick();
  }
}

new App();
