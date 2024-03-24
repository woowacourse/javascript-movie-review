import Movies, { MovieInfo } from '../domain/Movies';
import MovieItem from './MovieItem/MovieItem';
import SkeletonItem from './SkeletonItem/SkeletonItem';
import CustomError from '../utils/CustomError';
import ErrorPage from './ErrorPage/ErrorPage';
import { showAlert } from './Alert/Alert';
import { RULES } from '../constants/rule';
import { $ } from '../utils/dom';

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
      showAlert('마지막 페이지 입니다!');
      return;
    }

    if (this.#query) {
      this.renderSearchMovies();
      return;
    }

    this.renderMovies();
  }

  render(query: string) {
    this.initData(query);
    document.querySelector('.error-container')?.remove();

    if (this.#query) {
      this.renderSearchMovies();
      return;
    }

    this.renderMovies();
  }

  initData(query: string) {
    const ul = document.querySelector('ul.item-list');
    const subtitle = document.querySelector('.subtitle');
    if (!(ul instanceof HTMLElement)) return;
    if (!(subtitle instanceof HTMLElement)) return;

    subtitle.textContent = query ? `"${query}" 검색결과 입니다.` : '지금 인기 있는 영화';

    this.#page = 1;
    this.#query = query;
    ul.innerHTML = '';
  }

  async renderMovies() {
    this.#inputSkeleton();

    await this.#inputMovies();
  }

  async #inputMovies() {
    const ul = document.querySelector('ul.item-list');
    if (!(ul instanceof HTMLElement)) return;

    const movieData = await this.#getMovies(this.#page);

    const viewMoreButton = document.querySelector('.view-more-button');

    viewMoreButton?.classList.remove('hidden');

    if (!movieData || movieData.length < RULES.moviesPerPage) {
      viewMoreButton?.classList.add('hidden');
    }

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) => ul.appendChild(movieItem));

      this.#removeSkeleton();
      this.#page += 1;
    }
  }

  async renderSearchMovies() {
    this.#inputSkeleton();

    await this.#inputSearchMovies(this.#query);
  }

  async #inputSearchMovies(query: string) {
    const ul = document.querySelector('ul.item-list');
    if (!(ul instanceof HTMLElement)) return;

    const movieData = await this.#searchMovies(this.#page, query);

    if (movieData && !movieData.length) {
      this.#showErrorPage('검색한 결과를 찾을 수 없습니다.\n다른 검색어로 검색을 해보시겠어요?');
    }

    const viewMoreButton = document.querySelector('.view-more-button');

    viewMoreButton?.classList.remove('hidden');

    if (!movieData || movieData.length < RULES.moviesPerPage) {
      viewMoreButton?.classList.add('hidden');
    }

    if (movieData) {
      this.#createMovieItems(movieData).forEach((movieItem) => {
        ul.appendChild(movieItem);
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
      const viewMoreButton = document.querySelector('.view-more-button');

      viewMoreButton?.classList.add('hidden');
      this.#showErrorPage(error.message, error.status);
    }
  }

  #inputSkeleton() {
    const ul = document.querySelector('.item-list');
    if (!(ul instanceof HTMLElement)) return;

    Array.from({ length: RULES.moviesPerPage }).forEach(() =>
      ul.insertAdjacentElement('beforeend', SkeletonItem()),
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

      const viewMoreButton = document.querySelector('.view-more-button') as HTMLElement;

      viewMoreButton.classList.add('hidden');
      this.#showErrorPage(error.message, error.status);
    }
  }

  #createMovieItems(data: MovieInfo[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  #showErrorPage(message: string, status?: number) {
    document
      .querySelector('.subtitle')
      ?.insertAdjacentElement('afterend', ErrorPage({ status, message }));
  }
}

export default MovieContainer;
