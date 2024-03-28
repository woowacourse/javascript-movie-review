import { ScrollObserver } from '../../controller';
import { Movie } from '../../type/movie';
import { createElementWithAttribute } from '../../utils';

import MovieItem from './MovieItem';
import MovieListLastItem from './MovieListLastItem';
import NoneMovieItem from './NoneMovieItem';

class MovieList {
  #element: HTMLElement;
  #scrollObserver = new ScrollObserver();
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

  #startObserving() {
    if (!this.#isMovieList) return;

    const $scrollObserveTarget = this.#element.querySelector(
      '.scroll-observer-target',
    );
    if (!$scrollObserveTarget) return;

    this.#scrollObserver.observeTarget($scrollObserveTarget);
  }
}

export default MovieList;
