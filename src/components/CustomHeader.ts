import '../../css/custom-header.css';
import { $ } from '../utils/dom';
import { proxy } from '../state/state';
import { movie } from '../state/state';
import { getFormData } from '../utils/form';
import { customHeaderTemplate } from './templates/customHeader';
import { generateMovieListTemplate } from './templates/movieList';
import { searchMovieList } from '../domains/movieApi';

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
      const value = queryValue['search-input'] as string;
      if (movie.query === value) {
        return;
      }

      movie.query = value;
      this.storeSearchedMovieList();
    }
  }

  private storeSearchedMovieList() {
    movie.currentPage = 1;
    searchMovieList(movie.query, movie.currentPage).then(movieRoot => {
      movie.totalPages = movieRoot.total_pages;
      proxy.movie.list = generateMovieListTemplate(movieRoot.results);
    });
  }

  static render() {
    const container = $<HTMLDivElement>('#app');

    if (container instanceof HTMLDivElement && container.closest('body')) {
      container.insertAdjacentHTML('beforeend', customHeaderTemplate);
    }
  }
}

export default CustomHeader;
