import { Movie } from '../type/movie';
import { createElementWithAttribute } from '../utils';

import MovieItem from './MovieItem';
import NoneMovieItem from './NoneMovieItem';

class MovieList {
  #element: HTMLElement;

  constructor(movieList: Movie[] | undefined) {
    this.#element = this.#makeMovieList(movieList);
  }

  get element() {
    return this.#element;
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
    const isMovieList = movieList && movieList.length > 0;

    if (isMovieList) {
      movieList.forEach((movie) => {
        $ul.appendChild(new MovieItem(movie).element);
      });
      return $ul;
    }

    return this.#makeNoMovieList($ul);
  }
}

export default MovieList;
