import StarFilled from '../../images/star_filled.png';
import { createElementWithAttribute } from '../../utils';

class MovieScore {
  #element: HTMLElement;

  constructor(score: number) {
    this.#element = this.#makeMovieScore(score);
  }

  get element() {
    return this.#element;
  }

  #makeMovieScore(score: number) {
    const $score = createElementWithAttribute('p', { class: 'movie-score' });
    const $star = createElementWithAttribute('img', {
      src: StarFilled,
      alt: '별점',
    });
    const $scorePoint = createElementWithAttribute('span', {
      class: 'movie-score__point',
    });
    $scorePoint.textContent = score.toFixed(1).toString();
    $score.appendChild($star);
    $score.appendChild($scorePoint);

    return $score;
  }
}

export default MovieScore;
