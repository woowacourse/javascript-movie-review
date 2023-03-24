import '../../css/movie-container.css';
import { $ } from '../utils/dom';
import { movie } from '../state/state';
import { generateContainerTitleTemplate } from './templates/containerTitle';
import { movieContainerTemplate } from './templates/movieContainer';

class MovieContainer extends HTMLElement {
  viewportObserver: null | IntersectionObserver = null;

  constructor() {
    super();
  }

  connectedCallback() {}

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
    }
  }

  static renderMovieList(container: HTMLUListElement, movieList: string) {
    if (movie.currentPage === 1) {
      container.innerHTML = movieList;
    } else {
      container.insertAdjacentHTML('beforeend', movieList);
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
