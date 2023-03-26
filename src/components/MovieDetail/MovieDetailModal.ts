import Component from '../../types/component';
import MovieDetail from '../../types/MovieDetail';
import MovieDetailHeader from './MovieDetailHeader';

const STAR_COUNT_MAP: { [score: number]: string } = {
  0: '평가해주세요',
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

class MovieDetailModal implements Component {
  readonly node: HTMLElement;
  private children: { [key: string]: Component } = {};

  private modal!: HTMLDialogElement;
  private backdrop!: HTMLDivElement;
  private closeButton!: HTMLButtonElement;
  private starContainer!: HTMLDivElement;
  private stars!: HTMLImageElement[];
  private rating: number;
  private ratingMessage!: HTMLParagraphElement;

  private movieDetail: MovieDetail;

  constructor(movieDetail: MovieDetail) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-container');
    this.movieDetail = movieDetail;

    const ratingMap = JSON.parse(localStorage.getItem('rating') || '{}');
    this.rating = Number(ratingMap?.[movieDetail.id]) || 0;

    this.setChildren().composeNode().setElements().addEvents().showModal();
  }

  composeNode(): this {
    this.node.innerHTML = `
      <div class='backdrop'></div>
      <dialog class="modal">
      <div class="modal-body">
        <div class="modal-image" >
          <img
            src="${this.movieDetail.posterPath}"
            alt="이미지 설명"
          />
        </div>
        <div class="modal-info">
          <div class="modal-rating">
            <h3>평점</h3>
            <p>${this.movieDetail.voteAverage}</p>
          </div>
          <div class="modal-description">
            <h3>설명</h3>
            <p>${this.movieDetail.overview}</p>
          </div>
          <div class="modal-my-rating">
            <p>내 별점</p>
            <div class="rating-stars">
            ${this.starsTemplate()}
            </div>
            <p class="rating-message"><span class="rating">${
              this.rating === 0 ? '' : this.rating
            }</span><span class="rating-word">${STAR_COUNT_MAP[this.rating]}</span></p>
          </div>
        </div>
      </div> 
      </dialog>
      `;

    this.node.querySelector('.modal')?.insertAdjacentElement('afterbegin', this.children.header.node);

    return this;
  }

  starsTemplate(): string {
    const count = this.rating / 2;
    return Array.from({ length: 5 }, (_, index) => {
      if (index < count) {
        return `<img class="star data-index=${index} filled" src="./star_filled.png" alt="별점"/>`;
      }
      return `<img class="star" data-index=${index} src="./star_empty.png" alt="별점"/>`;
    }).join('');
  }

  setChildren(): this {
    this.children.header = new MovieDetailHeader(this.movieDetail.title, {
      onClose: this.#closeModal.bind(this),
    });

    return this;
  }

  setElements(): this {
    this.modal = this.node.querySelector('dialog')!;
    this.backdrop = this.node.querySelector('.backdrop')!;
    this.closeButton = this.node.querySelector('.close-button')!;
    this.starContainer = this.node.querySelector('.rating-stars')!;
    this.stars = [...this.node.querySelectorAll<HTMLImageElement>('.star')];
    this.ratingMessage = this.node.querySelector('.rating-message')!;

    return this;
  }

  addEvents(): this {
    this.backdrop.addEventListener('click', this.#closeModal.bind(this));
    this.modal.addEventListener('cancel', this.#closeModal.bind(this));

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

    this.ratingMessage.innerHTML = `<span class="rating">${
      rating === 0 ? '' : rating
    }</span><span class="rating-word">${STAR_COUNT_MAP[rating]}</span>`;

    const ratingMap = JSON.parse(localStorage.getItem('rating') || '{}');
    ratingMap[this.movieDetail.id] = rating;
    localStorage.setItem('rating', JSON.stringify(ratingMap));

    this.rating = rating;
  }

  #handleHoverStar(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    const targetIndex = target.dataset.index;
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

  #closeModal() {
    document.body.style.overflow = 'auto';
    this.node.remove();

    return this;
  }

  showModal() {
    this.modal.setAttribute('open', 'true');
    document.body.style.overflow = 'hidden';

    return this;
  }
}

export default MovieDetailModal;

// <img data-index=0 src="./star_empty.png" class="star" />
