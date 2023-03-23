import '../../css/movie-container.css';
import { $ } from '../utils/dom';
import { proxy } from '../state/state';
import { movie } from '../state/state';
import { generateContainerTitleTemplate } from './templates/containerTitle';
import { generateMoreButtonTemplate } from './templates/moreButton';
import { movieContainerTemplate } from './templates/movieContainer';
import { generateMovieListTemplate } from './templates/movieList';
import { getMoreMovieList } from '../domains/movieApi';

class MovieContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.moreButtonClickHandler);
  }

  private async moreButtonClickHandler(event: Event) {
    const target = event.target;

    if (target instanceof HTMLButtonElement && target.ariaLabel === '더 보기' && !movie.isClicked) {
      movie.isClicked = true;
      getMoreMovieList(movie.query, movie.currentPage + 1).then(root => {
        movie.currentPage = root.page;
        proxy.movie.list = [generateMovieListTemplate(root.results)];
        movie.isClicked = false;
      });
    }
  }

  static render() {
    const container = $<HTMLDivElement>('#app');
    if (container instanceof HTMLDivElement && container.closest('body')) {
      container.insertAdjacentHTML('beforeend', movieContainerTemplate);
      this.renderContainerTitle();
    }
  }

  static renderContents(movieList = '') {
    const container = $<HTMLElement>('.item-list');

    if (container instanceof HTMLUListElement) {
      this.renderMovieList(container, movieList);
      this.renderMoreButton();
    }
  }

  static renderMovieList(container: HTMLUListElement, movieList: string) {
    if (movie.currentPage === 1) {
      container.innerHTML = movieList;
    } else {
      container.insertAdjacentHTML('beforeend', movieList);
    }
  }

  static renderMoreButton() {
    const container = $<HTMLDivElement>('#more-button-container');

    if (container instanceof HTMLDivElement) {
      container.innerHTML = generateMoreButtonTemplate();
    }
  }

  static renderContainerTitle() {
    const container = $<HTMLHeadingElement>('#container-title');

    if (container instanceof HTMLHeadingElement) {
      container.innerHTML = generateContainerTitleTemplate();
    }
  }
}

export default MovieContainer;
