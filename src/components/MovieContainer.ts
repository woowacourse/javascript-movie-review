import '../../css/movie-container.css';
import { getMoreMovieList } from '../domains/movieApi';
import { proxy } from '../domains/proxy';
import { $ } from '../utils/dom';
import { generateContainerTitleTemplate } from './templates/containerTitle';
import { generateMoreButtonTemplate } from './templates/moreButton';
import { movieContainerTemplate } from './templates/movieContainer';
import { generateMovieListTemplate } from './templates/movieList';

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
      const movieRoot = await getMoreMovieList(proxy.movie.query, proxy.movie.currentPage + 1);
      proxy.movie.currentPage = movieRoot.page;
      const movieResults = movieRoot.results;
      proxy.movie.list += generateMovieListTemplate(movieResults);
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
        proxy.movie.currentPage === proxy.movie.totalPages
          ? generateContainerTitleTemplate(proxy.movie.query) + movieList
          : generateContainerTitleTemplate(proxy.movie.query) + movieList + generateMoreButtonTemplate();
    }
  }
}

export default MovieContainer;
