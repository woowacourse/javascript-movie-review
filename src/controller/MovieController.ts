import Movies, { MovieDetail, MovieInfo } from '../domain/Movies';
import MovieItem from '../components/MovieItem/MovieItem';
import CustomError from '../utils/CustomError';
import ErrorPage from '../components/ErrorPage/ErrorPage';
import { showAlert } from '../components/Alert/Alert';
import { RULES } from '../constants/rule';
import { $ } from '../utils/dom';
import { ALERT_MESSAGE, ERROR_MESSAGE, TITLE } from '../constants/messages';
import throttle from '../utils/throttle';
import SkeletonItem from '../components/SkeletonItem/SkeletonItem';

class MovieController {
  #page = 1;
  #query = '';
  #movies;
  #scrollEvent;

  constructor() {
    this.#movies = new Movies();
    this.#scrollEvent = this.#throttleInfinityScroll();
  }

  #throttleInfinityScroll() {
    return throttle(this.#infinityScroll.bind(this), 300);
  }

  #infinityScroll() {
    const documentHeight = document.body.scrollHeight;
    const presentHeight = window.scrollY + window.innerHeight;

    if (presentHeight / documentHeight > RULES.arriveScrollPercentage) {
      document.removeEventListener('scroll', this.#scrollEvent);
      this.renderNextPage();
    }
  }

  renderNextPage() {
    if (this.#page > RULES.maxPage) {
      document.removeEventListener('scroll', this.#scrollEvent);
      showAlert(ALERT_MESSAGE.lastPage);
      return;
    }

    if (this.#query) {
      this.#renderSearchMovies();
      return;
    }

    this.#renderPopularMovies();
  }

  async handleMovieClick(movieId: number) {
    const data: MovieDetail = await this.#movies.getMovieDetail(movieId);

    return data;
  }

  render(query: string = '') {
    const errorContainer = $('.error-container') as HTMLElement;

    this.#initData(query);

    if (!errorContainer.classList.contains('hidden')) {
      errorContainer.classList.add('hidden');
    }

    if (this.#query) {
      this.#renderSearchMovies();
      return;
    }

    this.#renderPopularMovies();
  }

  #initData(query: string) {
    const ul = $('ul.item-list');
    const subtitle = $('.subtitle');
    if (!(ul instanceof HTMLElement) || !(subtitle instanceof HTMLElement)) return;

    subtitle.textContent = query ? `"${query}" ${TITLE.searchResult}` : TITLE.popularMovies;

    this.#page = 1;
    this.#query = query;
    ul.innerHTML = '';
    Array.from({ length: RULES.moviesPerPage }).forEach(() => {
      ul.appendChild(SkeletonItem());
    });
  }

  async #renderPopularMovies() {
    this.#toggleSkeletonItems();

    const movieData = await this.#getPopularMovies(this.#page);
    if (!movieData) return;

    this.#createMovieItems(movieData).forEach((movieItem) => {
      $('.skeleton-item')?.insertAdjacentElement('beforebegin', movieItem);
    });
    this.#toggleSkeletonItems();
    this.#page += 1;

    if (movieData.length === RULES.moviesPerPage) {
      document.addEventListener('scroll', this.#scrollEvent);
    } else {
      document.removeEventListener('scroll', this.#scrollEvent);
    }
  }

  async #getPopularMovies(page: number) {
    try {
      const movieData = await this.#movies.getPopularMovies(page);

      return movieData;
    } catch (error) {
      if (!(error instanceof CustomError)) return;

      this.#toggleSkeletonItems();
      this.#showErrorPage(error.message, error.status);
    }
  }

  async #renderSearchMovies() {
    this.#toggleSkeletonItems();

    const movieData = await this.#searchMovies(this.#page, this.#query);
    if (!movieData) return;

    if (movieData && !movieData.length) {
      this.#showErrorPage(ERROR_MESSAGE.noSearchResult);
    }

    this.#createMovieItems(movieData).forEach((movieItem) => {
      $('.skeleton-item')?.insertAdjacentElement('beforebegin', movieItem);
    });
    this.#toggleSkeletonItems();
    this.#page += 1;

    if (movieData.length === RULES.moviesPerPage) {
      document.addEventListener('scroll', this.#scrollEvent);
    } else {
      document.removeEventListener('scroll', this.#scrollEvent);
    }
  }

  async #searchMovies(page: number, query: string) {
    try {
      const movieData = await this.#movies.getSearchMovies(query, page);

      return movieData;
    } catch (error) {
      if (!(error instanceof CustomError)) return;

      this.#toggleSkeletonItems();
      this.#showErrorPage(error.message, error.status);
    }
  }

  #createMovieItems(data: MovieInfo[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  #showErrorPage(message: string, status?: number) {
    const errorContainer = $('.error-container') as HTMLElement;

    errorContainer.innerHTML = '';
    errorContainer.appendChild(ErrorPage({ status, message }));
    errorContainer.classList.remove('hidden');
  }

  #toggleSkeletonItems() {
    const skeletonItems = document.querySelectorAll('.skeleton-item');

    skeletonItems.forEach((skeletonItem) => skeletonItem.classList.toggle('hide-skeleton'));
  }
}

export default MovieController;
