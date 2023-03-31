import { $, render } from '../utils';
import { header } from './header';
import { mainPage } from './mainPage';
import { showMovieList } from '../showMovieList';
import { movieInfoModal } from './movieInfoModal';
import { infiniteScrollLine } from './infiniteScrollLine';
import PageData from '../data/pageData';

export class App {
  #observer?: IntersectionObserver;

  constructor() {
    this.play();
  }

  play() {
    render(this.firstTemplate());
    this.setObserver();
  }

  firstTemplate() {
    return `
    ${header()}
    ${mainPage()}
    ${movieInfoModal()}
    ${infiniteScrollLine()}
  `;
  }

  setObserver() {
    const line = $('#InfiniteLine') as HTMLElement;

    this.#observer = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting && PageData.moreTotalPageThanCurrentPage()) {
        showMovieList();
      }
      return;
    });

    this.#observer.observe(line);
  }
}
