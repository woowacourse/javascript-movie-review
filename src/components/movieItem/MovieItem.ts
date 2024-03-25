import './MovieItem.css';

import FILLED_STAR from '../../assets/images/star_filled.png';
import { Movie } from '../../types/movie';
import { dom } from '../../utils/dom';
import skeleton from '../common/Skeleton';

class MovieItem {
  $target = document.createElement('li');

  constructor() {
    this.$target.appendChild(skeleton.create(1));
  }

  paint(movie: Movie) {
    const $title = dom.getElement<HTMLParagraphElement>(this.$target, '.item-title');
    this.#renderThumbnail(movie.imageSrc, movie.title);
    this.#renderCaption(movie.score);
    $title.textContent = movie.title;
    $title.classList.remove('skeleton');
  }

  create(movie: Movie) {
    this.paint(movie);
    return this.$target;
  }

  #renderThumbnail(imageSrc: string, title: string) {
    const $thumbnail = dom.getElement<HTMLImageElement>(this.$target, '.item-thumbnail');

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      $thumbnail.src = image.src;
      $thumbnail.setAttribute('alt', title);
      $thumbnail.classList.remove('skeleton');
    };
  }

  #renderCaption(score: number) {
    const $caption = dom.getElement<HTMLDivElement>(this.$target, '.item-caption');
    const $starIcon = dom.getElement<HTMLImageElement>(this.$target, '.item-star-icon');
    const $score = dom.getElement<HTMLParagraphElement>(this.$target, '.item-score');

    const image = new Image();
    image.src = FILLED_STAR;
    image.onload = () => {
      $starIcon.src = image.src;
      $starIcon.setAttribute('alt', '별점');
      $score.textContent = score.toString();
      $caption.classList.remove('skeleton');
    };
  }
}

export default MovieItem;
