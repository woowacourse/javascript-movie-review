import NULL_IMAGE from '../const/nullImage';
import { MovieItem } from '../domain/processMovieData';

class MovieCard {
  readonly node: HTMLElement;
  private thumbnail!: HTMLImageElement;
  private thumbnailSkeleton!: HTMLDivElement;

  private movieItemDetails: MovieItem;

  constructor(movieItemDetails: MovieItem) {
    // li 태그를 부모 태그로.
    this.node = document.createElement('li');

    // 상태 초기화
    this.movieItemDetails = movieItemDetails;

    // dom 생성 후 이벤트 추가
    this.composeNode().setElements().addEvents();
  }

  composeNode(): this {
    this.node.innerHTML = `<a>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <img
            id="item-thumbnail"
            class="item-thumbnail hidden"
            src="${this.movieItemDetails.posterPath}"
            alt=${this.movieItemDetails.title}
          />
          <p class="item-title">${this.movieItemDetails.title}</p>
          <div class="item-score">
            <img src="./star_filled.png" alt="별점" />
            <p>${this.movieItemDetails.voteAverage}</p>
          </div>
        </div>
      </a>
    `;
    return this;
  }

  setElements(): this {
    const thumbnail = this.node.querySelector<HTMLImageElement>('#item-thumbnail');
    const thumbnailSkeleton = this.node.querySelector<HTMLDivElement>('.skeleton');

    // type guard
    if (!thumbnail || !thumbnailSkeleton) {
      return this;
    }

    this.thumbnail = thumbnail;
    this.thumbnailSkeleton = thumbnailSkeleton;

    return this;
  }

  addEvents(): this {
    this.thumbnail.addEventListener('load', this.#handleLoadImage.bind(this));
    this.thumbnail.addEventListener('error', this.#handleNullImage.bind(this));

    return this;
  }

  #handleLoadImage() {
    if (!this.thumbnail.complete) return;

    this.thumbnailSkeleton.remove();
    this.thumbnail.classList.remove('hidden');
  }

  #handleNullImage() {
    this.thumbnail.src = NULL_IMAGE;
  }
}

export default MovieCard;
