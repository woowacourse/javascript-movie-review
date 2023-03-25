import '../../css/movie-container.css';
import { $ } from '../utils/dom';
import { movie } from '../state/state';
import { generateContainerTitleTemplate } from './templates/containerTitle';
import { movieContainerTemplate } from './templates/movieContainer';
import { emptyMessageTemplate } from './templates/emptyMessage';
import { movieModalContainerTemplate } from './templates/movieModalContainerTemplate';
import { getMovieDetails } from '../domains/movieApi';

class MovieContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.handleMovieClick);
  }

  private async handleMovieClick(event: Event) {
    const target = event.target;

    if (target instanceof HTMLLIElement) {
      await this.renderModalContents(target);
      this.openModal();
    }
  }

  private openModal() {
    const modal = $<HTMLElement>('.modal');

    if (modal instanceof HTMLElement) modal.classList.add('modal--open');
  }

  private async renderModalContents(target: HTMLLIElement) {
    const container = $<HTMLDivElement>('.modal-container');

    if (container instanceof HTMLDivElement) {
      const movieDetailsRoot = await getMovieDetails(target.id);
      const movieDetails = {
        title: movieDetailsRoot.title,
        src: movieDetailsRoot.poster_path,
        genre: movieDetailsRoot.genres.map(genre => genre.name),
        score: movieDetailsRoot.vote_average,
        overview: movieDetailsRoot.overview,
      };
      container.innerHTML = movieModalContainerTemplate(movieDetails);
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
      emptyMovieListContainer.innerHTML = movieList ? '' : emptyMessageTemplate;
    }
  }

  static renderMovieList(container: HTMLUListElement, movieList: string) {
    this.renderEmptyMessage(movieList);

    if (movie.currentPage === 1) {
      container.innerHTML = movieList;

      return;
    }

    container.insertAdjacentHTML('beforeend', movieList);
  }
}

export default MovieContainer;
