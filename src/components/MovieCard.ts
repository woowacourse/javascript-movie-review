import { Movie } from '../type/movie';
import { createElementWithAttribute } from '../utils';

import MovieImg from './MovieImg';
import MovieScore from './MovieScore';
import MovieTitle from './MovieTitle';

class MovieCard {
  #element: HTMLElement;
  constructor(movie: Movie) {
    this.#element = this.#renderMovieCard(movie);
  }

  get element() {
    return this.#element;
  }

  #renderMovieCard(movie: Movie) {
    const $card = createElementWithAttribute('div', { class: 'movie-card' });
    const $img = new MovieImg(movie).element;
    const $title = new MovieTitle(movie).element;
    const $score = new MovieScore(movie).element;

    $card.appendChild($img);
    $card.appendChild($title);
    $card.appendChild($score);

    return $card;
  }
}

export default MovieCard;
