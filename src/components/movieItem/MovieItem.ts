import './MovieItem.css';

import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';

const TEMPLATE = `
  <a href="#">
    <article class="item-card">
      <img class="item-thumbnail skeleton" loading="lazy" alt="" />
      <h3 class="item-title"></h3>
      <div class="item-caption">
        <p class="item-score"></p>
        <img class="item-star-icon" src="./images/star_filled.png" alt="별점" />
      </div>
    </article>
  </a>
`;

class MovieItem {
  $target: HTMLElement;

  constructor(movie: IMovie) {
    this.$target = document.createElement('li');
    this.$target.innerHTML = TEMPLATE;
    this.paint(movie);
  }

  paint(movie: IMovie) {
    const $image = dom.getElement<HTMLImageElement>(this.$target, '.item-thumbnail');
    const $title = dom.getElement(this.$target, '.item-title');
    const $score = dom.getElement(this.$target, '.item-score');

    $image.setAttribute('src', movie.imageSrc);
    $image.setAttribute('alt', movie.title);
    $title.innerText = movie.title;
    $score.textContent = movie.score.toString();
  }

  #formatScore(score: number) {}
}

export default MovieItem;
