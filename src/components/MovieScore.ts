import StarFilled from '../images/star_filled.png';
import { Movie } from '../type/movie';
import { createElementWithAttribute } from '../utils';

class MovieScore {
  #element: HTMLElement;

  constructor(movie: Movie) {
    this.#element = this.#makeMovieScore(movie);
  }

  get element() {
    return this.#element;
  }

  #makeMovieScore(movie: Movie) {
    const $score = createElementWithAttribute('p', { class: 'movie-score' });
    const $star = createElementWithAttribute('img', {
      src: StarFilled,
      alt: '별점',
    });
    const $scorePoint = createElementWithAttribute('span', {
      class: 'movie-score__point',
    });
    $scorePoint.textContent = movie.vote_average.toFixed(1).toString();
    $score.appendChild($star);
    $score.appendChild($scorePoint);

    return $score;
  }
}

export default MovieScore;
