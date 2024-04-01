import { MovieDataType } from '../api/apiType';
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
  }

  async renderMovies() {
    if (this.#isDataLoading) return;
    this.#inputSkeleton();
    await this.#inputMovies();
  }

  async #inputMovies() {
    //isDataLoading 을 true 로 설정 후 data 를 불러와야 false 로 바껴 다음 페이지를 렌더링 할 수 있게 했습니다.
    //그런데 isDataLoading 이 들어가서 너무 절차적으로 구현이 되었고, 해당 클래스가
    // 가지고 있는 상태가 많아진 것 같아서 이 클래스를 어떻게 해야할까요🥲
    // 그리고 만약 이렇게 하지 않는다면 , 네트워크 요청을 보낼지 말지 어떤식으로 알 수 있을까요?

    this.#isDataLoading = true;
    this.#page += 1;
    const movieData = await this.#getMovies(this.#page, this.#query);
    this.#isDataLoading = false;

    this.#updateBasedOnData(movieData);
  }

  #updateBasedOnData(movieData: MovieDataType[] | undefined) {
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

  #addMovieItems(movieData: MovieDataType[], element: HTMLElement) {
    this.#createMovieItems(movieData).forEach((movieItem) => {
      element.appendChild(movieItem);
    });
  }

  #noSearchMovies(movieData: MovieDataType[] | undefined) {
    return movieData && !movieData.length;
  }

  #noMoreMovies(movieData: MovieDataType[] | undefined) {
    return !movieData || movieData.length < 20;
  }

  async #getMovies(page: number, query: string) {
    try {
      const movieData = await (query ? getSearchMovieList(query, page) : getPopularMovieList(page));
      return movieData;
    } catch (error) {
      if (error instanceof Error) {
        this.#removeSkeleton();

        const [status, message] = error.message.split('-');

        if (status === 'Failed to fetch') {
          showAlert(ALERT_MESSAGE.network);
          this.#reRequest();
          throw new Error();
        }

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

  #createMovieItems(data: MovieDataType[]): HTMLElement[] {
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
