import NULL_IMAGE from '../constants/nullImage';
import MovieDetailFetcher from '../domain/fetcher/MovieDetailFetcher';
import Component from '../types/component';
import { MovieItem } from '../types/movie';
import MovieDetail from '../types/MovieDetail';
import MovieDetailModal from './MovieDetail/MovieDetailModal';

class MovieCard implements Component {
  readonly node: HTMLElement;
  private thumbnail!: HTMLImageElement;
  private thumbnailSkeleton!: HTMLDivElement;

  private movieItem: MovieItem;

  constructor(movieItem: MovieItem) {
    this.node = document.createElement('li');
    this.movieItem = movieItem;

    this.composeNode().setElements().addEvents();
  }

  composeNode(): this {
    this.node.innerHTML = `<a>
        <div class="item-card"">
          <div class="item-thumbnail skeleton"></div>
          <img
            data-id="${this.movieItem.id}"
            id="item-thumbnail"
            class="item-thumbnail hidden"
            src="${this.movieItem.posterPath}"
            alt=${this.movieItem.title}
          />
          <p class="item-title">${this.movieItem.title}</p>
          <div class="item-score">
            <img src="./star_filled.png" alt="별점" />
            <p>${this.movieItem.voteAverage}</p>
          </div>
        </div>
      </a>
    `;
    return this;
  }

  setElements(): this {
    const thumbnail = this.node.querySelector<HTMLImageElement>('#item-thumbnail');
    const thumbnailSkeleton = this.node.querySelector<HTMLDivElement>('.skeleton');

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
    this.thumbnail.addEventListener('click', this.#handleClickImage.bind(this));

    return this;
  }

  async #handleClickImage(event: Event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const id = Number(target.dataset.id);
    if (!id) return;

    try {
      const movieDetails: MovieDetail = await new MovieDetailFetcher(id).fetchMovie();
      const movieDetailModal = new MovieDetailModal(movieDetails);
      document.querySelector('#app')?.insertAdjacentElement('afterbegin', movieDetailModal.node);
    } catch (error) {
      console.error(error);
    }
  }

  #handleLoadImage(): void {
    if (!this.thumbnail.complete) return;

    this.thumbnailSkeleton.remove();
    this.thumbnail.classList.remove('hidden');
  }

  #handleNullImage(): void {
    this.thumbnail.src = NULL_IMAGE;
  }
}

export default MovieCard;
