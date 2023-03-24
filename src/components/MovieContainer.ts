import '../../css/movie-container.css';
import { $ } from '../utils/dom';
import { movie } from '../state/state';
import { generateContainerTitleTemplate } from './templates/containerTitle';
import { movieContainerTemplate } from './templates/movieContainer';
import { emptyMessageTemplate } from './templates/emptyMessage';

class MovieContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleMovieClick);
  }

  private handleMovieClick(event: Event) {
    const target = event.target;

    if (target instanceof HTMLLIElement) {
      this.openModal();
    }
  }

  private openModal() {
    const modal = $<HTMLElement>('.modal');

    if (modal instanceof HTMLElement) {
      modal.classList.add('modal--open');
    }
  }

  static render() {
    const container = $<HTMLElement>('main');
    if (container instanceof HTMLElement && container.closest('body')) {
      container.insertAdjacentHTML('beforeend', movieContainerTemplate);
      this.renderContainerTitle();
    }
  }

  static renderContents(movieList = '') {
    const container = $<HTMLElement>('.item-list');

    if (container instanceof HTMLUListElement) {
      this.renderContainerTitle();
      this.renderMovieList(container, movieList);
    }
  }

  static renderContainerTitle() {
    const container = $<HTMLHeadingElement>('#container-title');

    if (container instanceof HTMLHeadingElement) {
      container.innerHTML = generateContainerTitleTemplate();
    }
  }

  static renderEmptyMessage(movieList: string) {
    const emptyMovieListContainer = $<HTMLDivElement>('.empty-movie-list-container');

    if (emptyMovieListContainer instanceof HTMLDivElement) {
      if (!movieList) {
        emptyMovieListContainer.innerHTML = emptyMessageTemplate;
      } else {
        emptyMovieListContainer.innerHTML = '';
      }
    }
  }

  static renderMovieList(container: HTMLUListElement, movieList: string) {
    this.renderEmptyMessage(movieList);

    if (movie.currentPage === 1) {
      container.innerHTML = movieList;
    } else {
      container.insertAdjacentHTML('beforeend', movieList);
    }
  }
}

export default MovieContainer;
