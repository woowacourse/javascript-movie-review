import '../../css/custom-header.css';
import { $, $$ } from '../utils/dom';
import { proxy } from '../state/state';
import { movie } from '../state/state';
import { getFormData } from '../utils/form';
import { customHeaderTemplate } from './templates/customHeader';
import { generateMovieListTemplate } from './templates/movieList';
import { searchMovieList } from '../domains/movieApi';
import { isMovieRoot } from '../types/typeGuards';

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
      this.updateQuery(event);
    }
  }

  private updateQuery(event: Event) {
    const formData = getFormData(event);

    if (formData instanceof Object) {
      const queryValue = Object.fromEntries(formData);
      const value = queryValue['search-input'];

      if (movie.query === value) {
        return;
      }

      movie.query = value;
      this.storeSearchedMovieList();
    }
  }

  private async storeSearchedMovieList() {
    movie.currentPage = 1;

    const root = await searchMovieList(movie.query, movie.currentPage);
    if (isMovieRoot(root)) {
      movie.totalPages = root.total_pages;
      proxy.movie.list = [generateMovieListTemplate(root.results)];
    }
  }

  static render() {
    const container = $<HTMLDivElement>('#app');

    if (container instanceof HTMLDivElement) {
      container.insertAdjacentHTML('beforeend', customHeaderTemplate);
    }
  }
}

export default CustomHeader;
