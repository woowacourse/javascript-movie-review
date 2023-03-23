import { searchMovieList } from '../domains/movieApi';
import { proxy } from '../domains/proxy';
import { $ } from '../utils/dom';
import { getFormData } from '../utils/form';
import { customHeaderTemplate } from './templates/customHeader';
import { generateMovieListTemplate } from './templates/movieList';

class CustomHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.logoClickHandler);
    this.addEventListener('submit', this.searchBoxSubmitHandler);
  }

  private logoClickHandler(event: Event) {
    const target = event.target;

    if (target instanceof HTMLImageElement && target.id === 'logo') {
      window.location.reload();
    }
  }

  private searchBoxSubmitHandler(event: Event) {
    event.preventDefault();
    const target = event.target;

    if (target instanceof HTMLFormElement && target.className === 'search-box') {
      this.searchMovieList(event);
    }
  }

  private async searchMovieList(event: Event) {
    const formData = getFormData(event);
    if (formData instanceof Object) {
      const queryValue = Object.fromEntries(formData);
      proxy.movie.query = queryValue['search-input'] as string;
      const movieResults = (await searchMovieList(proxy.movie.query, proxy.movie.currentPage)).results;
      proxy.movie.list = generateMovieListTemplate(movieResults);
    }
  }

  static render() {
    const container = $<HTMLDivElement>('#app');

    if (container instanceof HTMLDivElement && container.closest('body')) {
      container.insertAdjacentHTML('beforeend', customHeaderTemplate);
    }
  }
}

export default CustomHeader;
