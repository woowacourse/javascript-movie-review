import './MovieItem.css';

import FILLED_STAR from '../../assets/images/star_filled.png';
import { Movie } from '../../types/movie';
import { dom } from '../../utils/dom';
import skeleton from '../common/Skeleton';
import { getDetailMovie } from '../../apis/movie';
import MovieDetailModal from '../movieDetailModal/movieDetailModal';

class MovieItem {
  $target = document.createElement('li');
  movieDetailModal: MovieDetailModal;
  movieId: number = -1;

  constructor(movieDetailModal: MovieDetailModal) {
    this.$target.appendChild(skeleton.create(1));
    this.movieDetailModal = movieDetailModal;
  }

  paint(movie: Movie) {
    this.movieId = movie.id;
    this.#renderThumbnail(movie.imageSrc, movie.title);
    this.#renderCaption(movie.score);
    const $title = dom.getElement<HTMLParagraphElement>(this.$target, '.item-title');
    $title.textContent = movie.title;
    $title.classList.remove('skeleton');

    this.setEvent();
  }

  create(movie: Movie) {
    this.paint(movie);
    return this.$target;
  }

  setEvent() {
    this.$target.addEventListener('click', () => {
      const $thumbnail = dom.getElement<HTMLImageElement>(this.$target, '.item-thumbnail');
      const $spinner = dom.getElement<HTMLImageElement>(this.$target, '.loading-spinner');
      $spinner.classList.add('loading');
      $thumbnail.classList.add('loading');

      getDetailMovie(this.movieId).then(res => {
        this.movieDetailModal.open(res);
        $spinner.classList.remove('loading');
        $thumbnail.classList.remove('loading');
      });
    });
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
