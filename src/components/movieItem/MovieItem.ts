import './MovieItem.css';

import FILLED_STAR from '../../assets/images/star_filled.png';
import { Movie } from '../../types/movie';
import { dom } from '../../utils/dom';

class MovieItem {
  $target: HTMLElement;

  constructor(movie: Movie) {
    this.$target = document.createElement('li');
    this.$target.innerHTML = this.template();
    this.paint(movie);
  }

  template() {
    return `   
        <a href="#">
          <div class="item-card">
          <img
          class="item-thumbnail skeleton"
          loading="lazy"
          alt=""
        />
        <p class="item-title"></p>
        <div class="item-caption">
          <p class="item-score"></p>
          <img class="item-star-icon" src=${FILLED_STAR} alt="별점" />
        </div>
        </div>
        </a>
      `;
  }

  paint(movie: Movie) {
    const $image = dom.getElement<HTMLImageElement>(this.$target, '.item-thumbnail');
    const $title = dom.getElement<HTMLParagraphElement>(this.$target, '.item-title');
    const $score = dom.getElement<HTMLParagraphElement>(this.$target, '.item-score');

    $image.setAttribute('src', movie.imageSrc);
    $image.setAttribute('alt', movie.title);
    $title.textContent = movie.title;
    $score.textContent = movie.score.toString();
  }
}

export default MovieItem;
