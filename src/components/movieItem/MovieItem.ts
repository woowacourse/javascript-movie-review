import './MovieItem.css';

import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';
import appInstance from '../App/App';
import MovieItemDetail from '../movieItemDetail/MovieItemDetail';

const TEMPLATE = `
    <article class="item-card">
      <img class="item-thumbnail skeleton" loading="lazy" alt="" />
      <h3 class="item-title"></h3>
      <div class="item-caption">
        <p class="item-score"></p>
        <img class="item-star-icon" src="./images/star_filled.png" alt="별점" />
      </div>
    </article>
`;

const FORMAT_FIXED_DIGIT = 1;

class MovieItem {
  readonly $target: HTMLElement;
  readonly #movie: IMovie;

  constructor(movie: IMovie) {
    this.$target = document.createElement('li');
    this.$target.innerHTML = TEMPLATE;
    this.#movie = movie;
    this.paint(movie);

    this.$target.addEventListener('click', this.#handleClick.bind(this));
  }

  paint(movie: IMovie) {
    const $image = dom.getElement<HTMLImageElement>(this.$target, '.item-thumbnail');
    const $title = dom.getElement(this.$target, '.item-title');
    const $score = dom.getElement(this.$target, '.item-score');

    $image.setAttribute('src', movie.imageSrc);
    $image.setAttribute('alt', movie.title);
    $title.innerText = movie.title;
    $score.textContent = this.#formatScore(movie.score);
  }

  #formatScore(score: number) {
    return score.toFixed(FORMAT_FIXED_DIGIT).toString();
  }

  #handleClick() {
    appInstance.paintModal(new MovieItemDetail(this.#movie).$target);
  }
}

export default MovieItem;
