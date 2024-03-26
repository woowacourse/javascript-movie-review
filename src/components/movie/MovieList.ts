import { ScrollObserver } from '../../service';
import { Movie } from '../../type/movie';
import { createElementWithAttribute } from '../../utils';

import MovieItem from './MovieItem';
import NoneMovieItem from './NoneMovieItem';

class MovieList {
  #element: HTMLElement;
  #scrollObserver = new ScrollObserver();
  #isMovieList: boolean;

  constructor(movieList: Movie[] | undefined) {
    this.#isMovieList = this.#setValueOfIsMovieList(movieList);
    this.#element = this.#makeMovieList(movieList);
    this.#activateScrollObserver();
  }

  get element() {
    return this.#element;
  }

  #setValueOfIsMovieList(movieList: Movie[] | undefined) {
    return !!(movieList && movieList.length > 0);
  }

  #makeScrollObserverTarget() {
    const $observerTarget = createElementWithAttribute('li', {
      id: 'scroll-observer-target',
    });

    return $observerTarget;
  }

  #makeNoMovieList($ul: HTMLElement) {
    $ul.classList.add('no-movie-list');
    $ul.appendChild(new NoneMovieItem().element);

    return $ul;
  }

  #makeMovieList(movieList: Movie[] | undefined) {
    const $ul = createElementWithAttribute('ul', {
      class: 'movie-list',
    });

    if (!movieList || !this.#isMovieList) {
      return this.#makeNoMovieList($ul);
    }

    movieList.forEach((movie) => {
      $ul.appendChild(new MovieItem(movie).element);
    });
    return $ul;
  }

  #activateScrollObserver() {
    if (!this.#isMovieList) return;

    this.#addScrollObserverTarget();
    this.#startObserving();
  }

  #addScrollObserverTarget() {
    const $scrollObserveTarget = this.#makeScrollObserverTarget();
    this.#element.append($scrollObserveTarget);
  }

  #startObserving() {
    const $scrollObserveTarget = this.#element.querySelector(
      '#scroll-observer-target',
    );
    if (!$scrollObserveTarget) return;

    this.#scrollObserver.observeTarget($scrollObserveTarget);
  }
}

export default MovieList;
