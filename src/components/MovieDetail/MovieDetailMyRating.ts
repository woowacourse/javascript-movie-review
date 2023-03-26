import COMMENT_BY_RATING from '../../constants/ratingComments';
import Component from '../../types/component';

class MovieDetailMyRating implements Component {
  readonly node: HTMLElement;

  readonly id: number;
  private rating: number;
  private starContainer!: HTMLDivElement;
  private stars!: HTMLImageElement[];
  private ratingMessage!: HTMLParagraphElement;

  constructor(id: number) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-my-rating');

    this.id = id;

    const ratingMap = JSON.parse(localStorage.getItem('rating') || '{}');
    this.rating = Number(ratingMap?.[id]) || 0;

    this.composeNode().setElements().addEvents();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <p>내 별점</p>
      <div class="rating-stars">${this.starsTemplate()}</div>
      <p class="rating-message">${this.ratingMessageTemplate()}</p>
    `;
    return this;
  }

  starsTemplate(): string {
    const count = this.rating / 2;
    return Array.from({ length: 5 }, (_, index) => {
      if (index < count) {
        return `<img class="star" data-index=${index} filled" src="./star_filled.png" alt="별점"/>`;
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
    let rating = 0;

    this.stars.forEach((star, index) => {
      if (index <= targetIndex) {
        star.src = './star_filled.png';
        star.classList.add('filled');
        rating += 2;
      } else {
        star.src = './star_empty.png';
        star.classList.remove('filled');
      }
    });

    this.rating = rating;

    this.ratingMessage.innerHTML = this.ratingMessageTemplate();

    const ratingStorage = JSON.parse(localStorage.getItem('rating') || '{}');
    ratingStorage[this.id] = this.rating;
    localStorage.setItem('rating', JSON.stringify(ratingStorage));
  }

  #handleHoverStar(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    const targetIndex = target.dataset.index;

    console.log(targetIndex, 'targetIndex');
    if (!targetIndex) return;

    this.stars.forEach((star, index) => {
      if (index <= Number(targetIndex)) {
        star.src = './star_filled.png';
      } else {
        star.src = './star_empty.png';
      }
    });
  }

  #handleLeaveStar() {
    this.stars.forEach((star, index) => {
      if (index < this.rating / 2) {
        star.src = './star_filled.png';
      } else {
        star.src = './star_empty.png';
      }
    });
  }
}

export default MovieDetailMyRating;
