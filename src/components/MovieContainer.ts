import Movies, { MovieInfo } from '../domain/Movies';
import MovieItem from './MovieItem/MovieItem';
import SkeletonItem from './SkeletonItem/SkeletonItem';
import CustomError from '../utils/CustomError';
import ErrorPage from './ErrorPage/ErrorPage';
import { showAlert } from './Alert/Alert';
import { RULES } from '../constants/rule';
import { $ } from '../utils/dom';
import { ALERT_MESSAGE, ERROR_MESSAGE, TITLE } from '../constants/messages';

class MovieContainer {
  #page;
  #query;
  #movies;

  constructor() {
    this.#page = 1;
    this.#query = '';
    this.#movies = new Movies();
    this.#setEvent();
    this.render(this.#query);
  }

  // TODO: 더 보기 버튼 클릭 시 비활성화 고민
  #setEvent() {
    $('.view-more-button')?.addEventListener('click', (event) =>
      this.#handleViewMoreButtonClick(event.target as HTMLButtonElement),
    );
  }

  #handleViewMoreButtonClick(target: HTMLButtonElement) {
    if (this.#page > RULES.maxPage) {
      target.classList.add('hidden');
      showAlert(ALERT_MESSAGE.lastPage);
      return;
    }

    if (this.#query) {
      this.renderSearchMovies();
      return;
    }

    this.renderMovies();
  }

  render(query: string = '') {
    const errorContainer = $('.error-container');
    this.initData(query);

    if (errorContainer) errorContainer.remove();

    if (this.#query) {
      this.renderSearchMovies();
      return;
    }

    this.renderMovies();
  }

  initData(query: string) {
    const ul = $('ul.item-list');
    const subtitle = $('.subtitle');
    if (!(ul instanceof HTMLElement) || !(subtitle instanceof HTMLElement)) return;

    subtitle.textContent = query ? `"${query}" ${TITLE.searchResult}` : TITLE.popularMovies;

    this.#page = 1;
    this.#query = query;
    ul.innerHTML = '';
  }

  async renderMovies() {
    this.#inputSkeleton();

    await this.#inputMovies();
  }

  async #inputMovies() {
    const movieData = await this.#getMovies(this.#page);

    $('.view-more-button')?.classList.remove('hidden');

    if (!movieData || movieData.length < RULES.moviesPerPage) {
      $('.view-more-button')?.classList.add('hidden');
    }

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) =>
        $('ul.item-list')?.appendChild(movieItem),
      );

      this.#removeSkeleton();
      this.#page += 1;
    }
  }

  async renderSearchMovies() {
    this.#inputSkeleton();

    await this.#inputSearchMovies(this.#query);
  }

  async #inputSearchMovies(query: string) {
    const movieData = await this.#searchMovies(this.#page, query);

    if (movieData && !movieData.length) {
      this.#showErrorPage(ERROR_MESSAGE.noSearchResult);
    }

    $('.view-more-button')?.classList.remove('hidden');

    if (!movieData || movieData.length < RULES.moviesPerPage) {
      $('.view-more-button')?.classList.add('hidden');
    }

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) => {
        $('ul.item-list')?.appendChild(movieItem);
      });
      this.#removeSkeleton();
      this.#page += 1;
    }
  }

  async #searchMovies(page: number, query: string) {
    try {
      const movieData = await this.#movies.getSearchMovies(query, page);

      return movieData;
    } catch (error) {
      if (!(error instanceof CustomError)) return;

      this.#removeSkeleton();
      $('.view-more-button')?.classList.add('hidden');
      this.#showErrorPage(error.message, error.status);
    }
  }

  #inputSkeleton() {
    Array.from({ length: RULES.moviesPerPage }).forEach(() =>
      $('.item-list')?.insertAdjacentElement('beforeend', SkeletonItem()),
    );
  }

  #removeSkeleton() {
    const skeletonItems = document.querySelectorAll('.skeleton-item');

    skeletonItems.forEach((item) => item?.remove());
  }

  async #getMovies(page: number) {
    try {
      const movieData = await this.#movies.getPopularMovies(page);

      return movieData;
    } catch (error) {
      if (!(error instanceof CustomError)) return;

      $('.view-more-button')?.classList.add('hidden');
      this.#showErrorPage(error.message, error.status);
    }
  }

  #createMovieItems(data: MovieInfo[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  #showErrorPage(message: string, status?: number) {
    $('.subtitle')?.insertAdjacentElement('afterend', ErrorPage({ status, message }));
  }
}

export default MovieContainer;
