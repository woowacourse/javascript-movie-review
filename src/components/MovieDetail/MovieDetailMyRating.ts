import COMMENT_BY_RATING from '../../constants/ratingComments';
import movieRatingStore from '../../domain/storage/movieRatingStore';
import Component from '../../types/component';
import { MovieRating } from '../../types/movie';

class MovieDetailMyRating implements Component {
  readonly node: HTMLElement;

  readonly id: number;
  private rating: MovieRating;
  private starContainer!: HTMLDivElement;
  private stars!: HTMLImageElement[];
  private ratingMessage!: HTMLParagraphElement;

  constructor(id: number) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-my-rating');

    this.id = id;
    this.rating = movieRatingStore.getMovieRating(id);

    this.composeNode().setElements().addEvents();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <p class="rating-title">내 별점</p>
      <div class="rating-stars">${this.starsTemplate()}</div>
      <p class="rating-message">${this.ratingMessageTemplate()}</p>
    `;
    return this;
  }

  starsTemplate(): string {
    const count = this.rating / 2;
    return Array.from({ length: 5 }, (_, index) => {
      if (index < count) {
        return `<img class="star" data-index=${index} src="./star_filled.png" alt="별점"/>`;
      }
      return `<img class="star" data-index=${index} src="./star_empty.png" alt="별점"/>`;
    }).join('');
  }

  ratingMessageTemplate(): string {
    return `<span class="rating">${this.rating === 0 ? '' : this.rating}</span><span class="rating-word">${
      COMMENT_BY_RATING[this.rating]
    }</span>`;
  }

  setElements(): this {
    this.starContainer = this.node.querySelector<HTMLDivElement>('.rating-stars')!;
    this.stars = [...this.node.querySelectorAll<HTMLImageElement>('.star')];
    this.ratingMessage = this.node.querySelector<HTMLParagraphElement>('.rating-message')!;

    return this;
  }

  addEvents(): this {
    this.starContainer.addEventListener('click', this.#handleClickStar.bind(this));
    this.starContainer.addEventListener('mouseover', this.#handleHoverStar.bind(this));
    this.starContainer.addEventListener('mouseleave', this.#handleLeaveStar.bind(this));

    return this;
  }

  #handleClickStar(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    const targetIndex = Number(target.dataset.index);

    this.rating = this.#changeStars(targetIndex);

    this.ratingMessage.innerHTML = this.ratingMessageTemplate();

    movieRatingStore.setMovieRating(this.id, this.rating);
  }

  #handleHoverStar(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    const targetIndex = Number(target.dataset.index);

    if (targetIndex === null) return;

    this.#changeStars(targetIndex);
  }

  #handleLeaveStar() {
    this.#changeStars(this.rating / 2 - 1);
  }

  #changeStars(targetIndex: number): MovieRating {
    let rating: MovieRating = 0;
    this.stars.forEach((star, index) => {
      if (index <= targetIndex) {
        star.src = './star_filled.png';
        rating += 2;
      } else {
        star.src = './star_empty.png';
      }
    });

    return rating;
  }
}

export default MovieDetailMyRating;
