import { $, render } from '../utils';
import { Header } from './Header';
import { MainPage } from './MainPage';
import { showMovieList } from '../showMovieList';
import { MovieInfoModal } from './MovieInfoModal';
import { InfiniteScrollLine } from './InfiniteScrollLine';
import PageData from '../data/PageData';

export class App {
  constructor() {
    this.play();
  }

  play() {
    render(this.firstTemplate());
    this.setObserver();
  }

  firstTemplate() {
    return `
    ${Header()}
    ${MainPage()}
    ${MovieInfoModal()}
    ${InfiniteScrollLine()}
  `;
  }

  setObserver() {
    const line = $('#InfiniteLine') as HTMLElement;
    PageData.setObserver(showMovieList, line);
  }
}
