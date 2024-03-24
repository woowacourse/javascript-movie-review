import './MovieItem.css';

import FILLED_STAR from '../../assets/images/star_filled.png';
import { Movie } from '../../types/movie';
import { dom } from '../../utils/dom';
import skeleton from '../Skeleton';

class MovieItem {
  $target = document.createElement('li');

  constructor() {
    this.$target.appendChild(skeleton.create(1));
  }

  paint(movie: Movie) {
    const $thumbnail = dom.getElement<HTMLImageElement>(this.$target, '.item-thumbnail');
    const $title = dom.getElement<HTMLParagraphElement>(this.$target, '.item-title');
    const $score = dom.getElement<HTMLParagraphElement>(this.$target, '.item-score');
    const $starIcon = dom.getElement<HTMLImageElement>(this.$target, '.item-star-icon');
    const $caption = dom.getElement<HTMLDivElement>(this.$target, '.item-caption');

    const image = new Image();
    image.src = movie.imageSrc;
    image.onload = () => {
      $thumbnail.src = image.src;
      $thumbnail.classList.remove('skeleton');
    };

    $thumbnail.setAttribute('alt', movie.title);
    $title.textContent = movie.title;
    $score.textContent = movie.score.toString();
    $starIcon.setAttribute('src', FILLED_STAR);
    $starIcon.setAttribute('alt', '별점');

    $title.classList.remove('skeleton');
    $caption.classList.remove('skeleton');
  }

  create(movie: Movie) {
    this.paint(movie);
    return this.$target;
  }
}

export default MovieItem;
