import { render } from '../utils';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { showMovieList } from './MovieList';

export class App {
  constructor() {
    this.play();
  }

  play() {
    render(this.firstTemplate());
    showMovieList('popular', null);
  }

  firstTemplate() {
    return `
    ${Header()}
    ${MainPage()}
  `;
  }
}
