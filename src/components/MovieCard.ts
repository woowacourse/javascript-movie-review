import { MovieItem } from '../types/movieType';
import starFilled from '../asset/star_filled.png';
import handleImageLoadError from '../libs/handleImageLoadError';

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

    this._node.innerHTML = `<a>
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

  clickMovieCard() {
    this._node.dispatchEvent(
      new CustomEvent('openMovieModal', { bubbles: true, detail: { movieId: this.movieData.id } })
    );
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
      handleImageLoadError(thumbnail);
    });

    this._node.addEventListener('click', this.clickMovieCard.bind(this));
  }
}

export default MovieCard;
