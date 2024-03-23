import { Movie } from '../type/movie';

import MovieCard from './MovieCard';

class MovieItem {
  #element: HTMLElement;

  constructor(movie: Movie) {
    this.#element = this.#makeMovieItem(movie);
  }

  get element() {
    return this.#element;
  }

  #makeMovieItem(movie: Movie) {
    const $li = document.createElement('li');
    const $a = document.createElement('a');
    const $card = new MovieCard(movie).element;
    //2단계 상세 모달 기능 추가
    $a.appendChild($card);
    $li.appendChild($a);

    return $li;
  }
}

export default MovieItem;
