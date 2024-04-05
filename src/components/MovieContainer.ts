import { getPopularMovieList } from '../api/popularMovieList';
import { getSearchMovieList } from '../api/searchMovieList';

import MovieItem from './MovieItem';

import SkeletonItem from './common/SkeletonItem';
import ErrorPage from './common/ErrorPage';

import { NO_SEARCH } from '../resource';
import { SUBTITLE, resizeMobileWidth } from '../constant/movie';
import { hiddenElement, showElement } from '../util/hiddenElement';
import { MovieData } from '../api/apiType';
import { showAlert } from './Alert';
class MovieContainer {
  #page;
  #query;
  #isDataLoading;
  #isOffline;

  constructor(element: HTMLElement) {
    this.#page = 0;
    this.#query = '';
    this.#isDataLoading = false;
    this.#isOffline = false;

    this.#getTemplate(element);
  }

  render(query: string) {
    this.initData(query);
    this.renderMovies();
  }

  initData(query: string) {
    const subtitle = document.querySelector('.subtitle');

    if (!(subtitle instanceof HTMLElement)) return;

    query
      ? (subtitle.textContent = `"${query}" ${SUBTITLE.search}`)
      : (subtitle.textContent = SUBTITLE.popular);

    this.#resetData(query);
  }

  #resetData(query: string) {
    const ul = document.querySelector('ul.item-list');
    if (!(ul instanceof HTMLElement)) return;

    this.#page = 0;
    this.#query = query;
    ul.innerHTML = '';
    this.#isDataLoading = false;
    this.#isOffline = false;
  }

  searchBarClose = () => {
    if (window.innerWidth <= resizeMobileWidth) {
      const title = document.querySelector('h1');
      const searchBox = document.querySelector('.search-box');
      const searchInput = document.querySelector('.search-input');

      searchBox?.classList.add('mobile-search');

      hiddenElement(searchInput);
      showElement(title);
    }
    return;
  };

  infiniteScroll() {
    const bottom = document.querySelector('.bottom');
    if (bottom === null) return;

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.#isDataLoading) {
            this.renderMovies();
          }
        });
      },
      { threshold: 0.3 },
    );

    io.observe(bottom);
  }

  setEvent() {
    const section = document.querySelector('.item-view');
    section?.addEventListener('click', this.searchBarClose);

    window.addEventListener('offline', () => {
      showAlert('네트워크 오류입니다');
      this.#page;
      this.#isOffline = true;
    });

    window.addEventListener('online', () => {
      this.#isOffline = false;
      this.renderMovies();
    });
  }

  async renderMovies() {
    this.#inputSkeleton();
    await this.#inputMovies();
  }

  async #inputMovies() {
    this.#isDataLoading = true;
    this.#page += 1;
    const movieData = await this.#getMovies(this.#page, this.#query);
    this.#isDataLoading = false;

    this.#updateBasedOnData(movieData);
  }

  #updateBasedOnData(movieData: MovieData[] | undefined) {
    const movie = document.querySelector('ul.item-list');
    if (!(movie instanceof HTMLElement)) return;

    if (this.#noSearchMovies(movieData)) {
      movie.innerHTML = `<img src=${NO_SEARCH} class="error"/>`;
    }

    if (this.#noMoreMovies(movieData)) {
      this.#isDataLoading = true;
    }

    if (movieData) {
      this.#addMovieItems(movieData, movie);
      this.#removeSkeleton();
    }
  }

  #addMovieItems(movieData: MovieData[], element: HTMLElement) {
    this.#createMovieItems(movieData).forEach((movieItem) => {
      element.appendChild(movieItem);
    });
  }

  #noSearchMovies(movieData: MovieData[] | undefined) {
    return movieData && !movieData.length;
  }

  #noMoreMovies(movieData: MovieData[] | undefined) {
    return !movieData || movieData.length < 20;
  }

  async #getMovies(page: number, query: string) {
    try {
      const movieData = await (query ? getSearchMovieList(query, page) : getPopularMovieList(page));
      return movieData;
    } catch (error) {
      if (error instanceof Error && !this.#isOffline) {
        this.#removeSkeleton();

        const [status, message] = error.message.split('-');

        this.showErrorPage({ status, message });
      }
    }
  }

  showErrorPage({ status, message }: { status: string; message: string }) {
    const movie = document.querySelector('ul.item-list');
    if (!(movie instanceof HTMLElement)) return;

    this.#isDataLoading = true;
    movie.innerHTML = ErrorPage({ status, message }).outerHTML;
  }

  #inputSkeleton() {
    const ul = document.querySelector('.item-list');
    if (!(ul instanceof HTMLElement)) return;

    Array.from({ length: 20 }).forEach(() => ul.insertAdjacentElement('beforeend', SkeletonItem()));
  }

  #removeSkeleton() {
    const skeletonItems = document.querySelectorAll('.skeleton-item');

    skeletonItems.forEach((item) => item?.remove());
  }

  #createMovieItems(data: MovieData[]): HTMLElement[] {
    return data.map((prop) => MovieItem(prop));
  }

  #getTemplate(element: HTMLElement) {
    const section = document.createElement('section');

    const h2 = document.createElement('h2');
    const movieList = document.createElement('ul');
    const bottom = document.createElement('div');

    h2.classList.add('subtitle');
    section.classList.add('item-view');
    movieList.classList.add('item-list');
    bottom.classList.add('bottom');

    section.appendChild(h2);
    section.appendChild(movieList);
    section.appendChild(bottom);

    element.appendChild(section);
  }
}

export default MovieContainer;
