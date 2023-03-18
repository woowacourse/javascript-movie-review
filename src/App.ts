import { $ } from './utils/domSelector';
import NavBar from './components/NavBar';
import './components/MovieListContainer';
import MovieListContent from './components/MovieListContent';

class App {
  constructor() {
    this.render();
    this.initEvents();
    MovieListContent.loadMovies();
  }

  render() {
    $<HTMLDivElement>('#app').insertAdjacentHTML('afterbegin', NavBar.template());
  }

  initEvents() {
    NavBar.addEventToSearchInput();
  }
}

new App();
