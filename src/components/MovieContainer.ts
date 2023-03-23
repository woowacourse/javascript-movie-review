import '../../css/movie-container.css';
import { $ } from '../utils/dom';
import { proxy } from '../state/state';
import { movie } from '../state/state';
import { containerTitleTemplate } from './templates/containerTitle';
import { generateMoreButtonTemplate } from './templates/moreButton';
import { movieContainerTemplate } from './templates/movieContainer';
import { generateMovieListTemplate } from './templates/movieList';
import { getMoreMovieList } from '../domains/movieApi';

class MovieContainer extends HTMLElement {
  constructor() {
    super();
  }

  private connectedCallback() {
    this.addEventListener('click', this.moreButtonClickHandler);
  }

  private async moreButtonClickHandler(event: Event) {
    const target = event.target;

    if (target instanceof HTMLButtonElement && target.ariaLabel === '더 보기') {
      const movieRoot = await getMoreMovieList(movie.query, movie.currentPage + 1);
      movie.currentPage = movieRoot.page;
      proxy.movie.list += generateMovieListTemplate(movieRoot.results);
    }
  }

  static initRender() {
    const container = $<HTMLDivElement>('#app');
    if (container instanceof HTMLDivElement && container.closest('body')) {
      container.insertAdjacentHTML('beforeend', movieContainerTemplate);
    }
  }

  static renderContents(movieList = '') {
    const container = $<HTMLElement>('.item-view');

    if (container instanceof HTMLElement) {
      container.innerHTML = container.innerHTML =
        movie.currentPage === movie.totalPages
          ? containerTitleTemplate + movieList
          : containerTitleTemplate + movieList + generateMoreButtonTemplate();
    }
  }
}

export default MovieContainer;
