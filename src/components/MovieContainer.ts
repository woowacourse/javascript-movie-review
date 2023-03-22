import { movieApi } from '../domains/movieApi';
import { proxy } from '../domains/proxy';
import { MovieContainerRenderProps } from '../types/movieContainer';
import { $ } from '../utils/dom';
import { generateContainerTitle } from './templates/containerTitle';
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
      proxy.movie.currentPage += 1;
      const movieListAdder = (await movieApi.getMoreMovieList(proxy.movie.query, proxy.movie.currentPage)).results;
      proxy.movie.list += generateMovieListTemplate(movieListAdder);
    }
  }

  static initRender() {
    const container = $<HTMLDivElement>('#app');
    if (container instanceof HTMLDivElement && container.closest('body')) {
      container.insertAdjacentHTML('beforeend', movieContainerTemplate);
    }
  }

  static renderContents({
    containerTitle = generateContainerTitle(),
    movieList = '',
    moreButton = '',
  }: MovieContainerRenderProps) {
    const container = $<HTMLElement>('.item-view');

    if (container instanceof HTMLElement) container.innerHTML = containerTitle + movieList + moreButton;
  }
}

export default MovieContainer;
