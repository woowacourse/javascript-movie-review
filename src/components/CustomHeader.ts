import '../../css/custom-header.css';
import { $ } from '../utils/dom';
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
    this.addEventListener('click', this.clickHandler);
    this.addEventListener('submit', this.submitHandler);
  }

  private clickHandler(event: Event) {
    const target = event.target;

    if (window.innerWidth <= 575 && target instanceof HTMLButtonElement && target.ariaLabel === '검색창 열기') {
      this.toggleMobileUi(target);
    }
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const target = event.target;

    if (target instanceof HTMLFormElement) {
      this.updateQuery(event);

      if (window.innerWidth <= 575) this.toggleMobileUi();
    }
  }

  private toggleMobileUi(mobileButtonContainer = $<HTMLButtonElement>('.mobile-button')) {
    const headerContainer = $<HTMLElement>('custom-header');
    const logoContainer = $<HTMLHeadingElement>('h1');
    const searchBoxContainer = $<HTMLFormElement>('.search-box');

    if (
      mobileButtonContainer instanceof HTMLButtonElement &&
      headerContainer instanceof HTMLElement &&
      logoContainer instanceof HTMLHeadingElement &&
      searchBoxContainer instanceof HTMLFormElement
    ) {
      headerContainer.classList.toggle('mobile-header');
      mobileButtonContainer.classList.toggle('mobile-button--open');
      logoContainer.classList.toggle('logo--close');
      searchBoxContainer.classList.toggle('search-box--open');
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
