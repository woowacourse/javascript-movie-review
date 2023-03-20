import { MovieItem } from '../@types/movieType';
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

    console.log(this.movieData.posterPath);

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

  errorLoadImage(thumbnail: HTMLImageElement) {
    thumbnail.src =
      'https://user-images.githubusercontent.com/112997662/223046479-306cc6a7-7024-4616-b28e-be2f2878d2f0.png';
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
