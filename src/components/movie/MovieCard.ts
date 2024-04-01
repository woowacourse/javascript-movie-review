import { MOVIE_CHILDREN_CLASS } from '../../constants';
import { Movie } from '../../type/movie';
import { createElementWithAttribute } from '../../utils';

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
    const $card = createElementWithAttribute('div', {
      class: MOVIE_CHILDREN_CLASS.card,
    });

    $card.appendChild(new MovieImg({ ...movie }).element);
    $card.appendChild(new MovieTitle(movie.title).element);
    $card.appendChild(new MovieScore(movie.vote_average).element);

    return $card;
  }
}

export default MovieCard;
