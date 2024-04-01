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
    const $score = createElementWithAttribute('p', {
      class: 'movie-score',
    });

    $score.appendChild(this.#makeScoreStar());
    $score.appendChild(this.#makeScorePoint(score));

    return $score;
  }

  #makeScoreStar() {
    return createElementWithAttribute<HTMLImageElement>('img', {
      src: StarFilled,
      alt: '별점',
    });
  }

  #makeScorePoint(score: number) {
    const $scorePoint = createElementWithAttribute<HTMLSpanElement>('span', {
      class: 'movie-score__point',
    });

    $scorePoint.textContent = score.toFixed(1).toString();

    return $scorePoint;
  }
}

export default MovieScore;
