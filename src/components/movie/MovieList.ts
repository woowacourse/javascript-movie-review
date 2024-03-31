import {
  APIHandlerForScroll,
  ChangedMovieListRenderer,
  ScrollObserver,
} from '../../controller';
import { ListType, Movie } from '../../type/movie';
import { createElementWithAttribute, ElementFinder } from '../../utils';

import MovieItem from './MovieItem';
import MovieListLastItem from './MovieListLastItem';
import NoneMovieItem from './NoneMovieItem';

class MovieList {
  #element: HTMLElement;
  #isMovieList: boolean;

  constructor(movieList: Movie[] | undefined, isMoreData: boolean) {
    this.#isMovieList = this.#setValueOfIsMovieList(movieList);
    this.#element = this.#makeMovieList(movieList, isMoreData);
    this.#startObserving();
  }

  get element() {
    return this.#element;
  }

  #setValueOfIsMovieList(movieList: Movie[] | undefined) {
    return !!(movieList && movieList.length > 0);
  }

  #makeNoMovieList($ul: HTMLElement) {
    $ul.classList.add('no-movie-list');
    $ul.appendChild(new NoneMovieItem().element);

    return $ul;
  }

  #makeMovieList(movieList: Movie[] | undefined, isMoreData: boolean) {
    const $ul = createElementWithAttribute('ul', {
      class: 'movie-list',
    });
    if (!movieList || !this.#isMovieList) {
      return this.#makeNoMovieList($ul);
    }
    movieList.forEach((movie) => {
      $ul.appendChild(new MovieItem(movie).element);
    });
    const $lastItem = new MovieListLastItem(isMoreData).element;
    $ul.appendChild($lastItem);
    return $ul;
  }

  /**
   * 영화 리스트 타입에 따라, 관련된 데이터를 불어와서 영화 리스트에 추가해 영화 리스트 ui를 변경한다.
   * @param  {ListType} listType : 현재 보여지는 영화 리스트
   */
  async updateMovieData() {
    const listType = this.#getListType();
    if (!listType) return;
    // 데이터 업데이트
    await APIHandlerForScroll.handleGetMovieData(listType);
    // 업데이트 된 영화 리스트 ui로 구현
    ChangedMovieListRenderer.updateMovieList();
  }

  #getListType(): ListType | undefined {
    const $movieListContainer = ElementFinder.findElementBySelector(
      '.movie-list-container',
    );

    if (!$movieListContainer || !$movieListContainer.hasAttribute('name'))
      return;

    const name = $movieListContainer.getAttribute('name');

    return name === 'search' ? 'search' : 'popular';
  }

  #startObserving() {
    if (!this.#isMovieList) return;

    const $scrollObserverTarget = this.#element.querySelector(
      '.scroll-observer-target',
    );
    if (!$scrollObserverTarget) return;

    const scrollObserver = new ScrollObserver(this.updateMovieData.bind(this));
    scrollObserver.observeTarget($scrollObserverTarget);
  }
}

export default MovieList;
