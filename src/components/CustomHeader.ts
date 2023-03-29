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
  throttle: null | NodeJS.Timeout = null;

  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('click', this.clickHandler);
    this.addEventListener('submit', this.submitHandler);
    window.addEventListener('resize', this.resizeHandler.bind(this));
  }

  private clickHandler(event: Event) {
    const target = event.target;

    if (target instanceof HTMLButtonElement && target.ariaLabel === '검색창 열기') {
      this.openMobileSearchBox(target);
    }
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    const target = event.target;

    if (target instanceof HTMLFormElement) {
      this.updateQuery(event);

      this.closeMobileSearchBox();
    }
  }

  private resizeHandler() {
    if (!this.throttle && window.innerWidth >= 576) {
      this.throttle = setTimeout(() => {
        this.closeMobileSearchBox();
        this.throttle = null;
      }, 100);
    }
  }

  private openMobileSearchBox(mobileButtonContainer = $<HTMLButtonElement>('.mobile-button')) {
    const headerContainer = $<HTMLElement>('custom-header');
    const logoContainer = $<HTMLHeadingElement>('h1');
    const searchBoxContainer = $<HTMLFormElement>('.search-box');

    if (mobileButtonContainer && headerContainer && logoContainer && searchBoxContainer) {
      mobileButtonContainer.classList.remove('mobile-button--open');
      headerContainer.classList.add('mobile-header');
      logoContainer.classList.add('logo--close');
      searchBoxContainer.classList.add('search-box--open');
    }
  }

  private closeMobileSearchBox(mobileButtonContainer = $<HTMLButtonElement>('.mobile-button')) {
    const headerContainer = $<HTMLElement>('custom-header');
    const logoContainer = $<HTMLHeadingElement>('h1');
    const searchBoxContainer = $<HTMLFormElement>('.search-box');

    if (mobileButtonContainer && headerContainer && logoContainer && searchBoxContainer) {
      mobileButtonContainer.classList.add('mobile-button--open');
      headerContainer.classList.remove('mobile-header');
      logoContainer.classList.remove('logo--close');
      searchBoxContainer.classList.remove('search-box--open');
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
      proxy.movie.list = generateMovieListTemplate(root.results);
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
