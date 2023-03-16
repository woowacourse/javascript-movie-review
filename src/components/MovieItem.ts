import { Movie } from '../domain/processMovieData';

class MovieItem {
  private _node!: HTMLElement;
  private movieData: Movie;

  constructor(movieDate: Movie) {
    this.movieData = movieDate;
    this.createTemplate();
    this.initEventHandelr();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(): this {
    this._node = document.createElement('li');

    this._node.innerHTML = `<a>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <img
            id="item-thumbnail"
            class="item-thumbnail hidden"
            src="https://image.tmdb.org/t/p/w220_and_h330_face/${this.movieData.backdropPath}"
            alt=${this.movieData.title}
          />
          <p class="item-title">${this.movieData.title}</p>
          <div class="item-score">
            <img src="./star_filled.png" alt="별점" />
            <p>${this.movieData.voteAverage}</p>
          </div>
        </div>
      </a>
    `;

    return this;
  }

  updateMovie(props: Movie) {
    this.movieData = props;
  }

  completeLoadImage(thumbnail: HTMLImageElement, thumbnailSkeleton: HTMLDivElement) {
    thumbnailSkeleton.remove();
    thumbnail.classList.remove('hidden');
  }

  errorLoadImage(thumbnail: HTMLImageElement) {
    thumbnail.classList.add('hidden');
  }

  initEventHandelr() {
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

export default MovieItem;
