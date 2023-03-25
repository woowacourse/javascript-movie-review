import { MovieItem } from '../types/movieType';
import starFilled from '../asset/star_filled.png';

class MovieCard {
  private _node!: HTMLElement;
  private movieData: MovieItem;

  constructor(movieDate: MovieItem) {
    this.movieData = movieDate;
    this.createTemplate();
    this.initEventHandler();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate() {
    this._node = document.createElement('li');

    this._node.innerHTML = /*html*/ `<a>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <img
            id="item-thumbnail"
            class="item-thumbnail hidden"
            src="${this.movieData.posterPath}"
            alt="${this.movieData.title}"
          />
          <p class="item-title">${this.movieData.title}</p>
          <div class="item-score">
            <img src="${starFilled}" alt="별점" />
            <p>${this.movieData.voteAverage}</p>
          </div>
        </div>
      </a>
    `;
  }

  updateMovie(props: MovieItem) {
    this.movieData = props;
  }

  completeLoadImage(thumbnail: HTMLImageElement, thumbnailSkeleton: HTMLDivElement) {
    thumbnailSkeleton.remove();
    thumbnail.classList.remove('hidden');
  }

  errorLoadImage(thumbnail: HTMLImageElement) {
    thumbnail.src =
      'http://dino-typing.com/data/file/dino_color/2038718610_IfTXhGvO_20f04c8989c435c3a4912831703adb190be75c97.png';
  }

  initEventHandler() {
    const thumbnail = this._node.querySelector<HTMLImageElement>('#item-thumbnail');
    const thumbnailSkeleton = this._node.querySelector<HTMLDivElement>('.skeleton');

    if (!thumbnail || !thumbnailSkeleton) return;

    thumbnail.addEventListener('load', () => {
      if (!thumbnail.complete) return;

      this.completeLoadImage(thumbnail, thumbnailSkeleton);
    });

    thumbnail.addEventListener('error', () => {
      this.errorLoadImage(thumbnail);
    });
  }
}

export default MovieCard;
