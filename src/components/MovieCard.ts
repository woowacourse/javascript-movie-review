import { MovieItem } from '../domain/processMovieData';

class MovieCard {
  private _node!: HTMLElement;
  private movieData: MovieItem;

  constructor(movieDate: MovieItem) {
    this.movieData = movieDate;
    this.createTemplate();
    this.initEventHandelr();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(): this {
    this._node = document.createElement('li');

    console.log(this.movieData.posterPath);

    this._node.innerHTML = `<a>
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <img
            id="item-thumbnail"
            class="item-thumbnail hidden"
            src="${this.movieData.posterPath}"
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

  updateMovie(props: MovieItem) {
    this.movieData = props;
  }

  completeLoadImage(thumbnail: HTMLImageElement, thumbnailSkeleton: HTMLDivElement) {
    thumbnailSkeleton.remove();
    thumbnail.classList.remove('hidden');
  }

  errorLoadImage(thumbnail: HTMLImageElement) {
    thumbnail.src = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';
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

export default MovieCard;
