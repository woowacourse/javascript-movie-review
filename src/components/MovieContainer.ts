import { getPopularMovieList } from '../api/popularMovieList';
import { getSearchMovieList } from '../api/searchMovieList';

import MovieItem from './MovieItem';

import SkeletonItem from './common/SkeletonItem';
import { showAlert } from './common/Alert';
import ErrorPage from './common/ErrorPage';

import { NO_SEARCH } from '../resource';
import { ALERT_MESSAGE, SUBTITLE, resizeMobileWidth } from '../constant/movie';
import { hiddenElement, showElement } from '../util/hiddenElement';
import { throttleOnRendering } from './../util/throttling';
import { MovieData } from '../api/apiType';
class MovieContainer {
  #page;
  #query;
  #isDataLoading;

  constructor(element: HTMLElement) {
    this.#page = 0;
    this.#query = '';
    this.#isDataLoading = false;

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
    const isScrollEnded = window.innerHeight + window.scrollY + 100 >= document.body.offsetHeight;
    if (isScrollEnded) {
      this.renderMovies();
    }
  }

  setEvent() {
    window.addEventListener(
      'scroll',
      throttleOnRendering(() => {
        this.infiniteScroll();
      }),
    );

    const section = document.querySelector('.item-view');
    section?.addEventListener('click', this.searchBarClose);

    window.addEventListener('offline', () => {
      showAlert(ALERT_MESSAGE.network);
      this.#reRequest();
    });

    window.addEventListener('online', () => {
      this.#inputMovies();
    });
    //TODO: 이 부분 이벤트 받아서 온라인인지 오프라인인지, 이벤트 타입ㅂ으로 구분해서
    // 재요청 보내게 하고나....에러 페이지 띄우지 못하게 하기...
  }

  async renderMovies() {
    if (this.#isDataLoading) return;
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

  onNetWorkError() {
    window.addEventListener('offline', () => {
      showAlert(ALERT_MESSAGE.network);
      // throw new Error();
    });

    window.addEventListener('online', () => {
      this.#reRequest();
    });
  }
  async #getMovies(page: number, query: string) {
    try {
      const movieData = await (query ? getSearchMovieList(query, page) : getPopularMovieList(page));
      return movieData;
    } catch (error) {
      if (error instanceof Error) {
        this.#removeSkeleton();

        const [status, message] = error.message.split('-');

        // if (status === 'Failed to fetch') {
        //   showAlert(ALERT_MESSAGE.network);
        //   this.#reRequest();
        //   throw new Error();
        // }

        const movie = document.querySelector('ul.item-list');
        if (!(movie instanceof HTMLElement)) return;

        this.#isDataLoading = true;
        movie.innerHTML = ErrorPage({ status, message }).outerHTML;
      }
    }
  }

  #reRequest() {
    setTimeout(() => {
      this.#getMovies(this.#page, this.#query);
      this.#isDataLoading = false;
    }, 3000);
    //네트워크가 끊기고 다시 요청을 보내고 싶어서 이렇게 했는데,
    //보통은 네트워크 에러처리를 어떤식으로 하는 지 궁금합니다!
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

    h2.classList.add('subtitle');
    section.classList.add('item-view');
    movieList.classList.add('item-list');

    section.appendChild(h2);
    section.appendChild(movieList);

    element.appendChild(section);
  }
}

export default MovieContainer;
