import Component from '../types/component';

const STAR_COUNT_MAP: { [score: number]: string } = {
  2: '최악이예요',
  4: '별로예요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

class MovieDetailModal {
  readonly node: HTMLElement;
  private modal!: HTMLDialogElement;
  private backdrop!: HTMLDivElement;
  private closeButton!: HTMLButtonElement;
  private starContainer!: HTMLDivElement;
  private stars!: HTMLImageElement[];
  private rating: number;
  private ratingMessage!: HTMLParagraphElement;

  constructor() {
    this.node = document.createElement('div');
    this.node.classList.add('modal-container');

    this.composeNode().setElements().addEvents();

    this.rating = this.setRatings();
  }

  setRatings(): number {
    return this.stars.reduce((count, star) => {
      if (star.classList.contains('filled')) return count + 1;

      return count * 2;
    }, 0);
  }

  composeNode(): this {
    this.node.innerHTML = `
      <div class='backdrop'></div>
      <dialog class="modal">
      <div class="modal-header">
        <h2>모달창 제목</h2>
        <button>
          <div class="close close-button" type="reset">
            <img src="./close_button">
          </div>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-image">
          <img
            src="https://www.ibric.org/upload/geditor/202102/0.04581200_1612885177.jpg"
            alt="이미지 설명"
            width="292"
            height="433"
          />
        </div>
        <div class="modal-info">
          <div class="modal-rating">
            <h3>평점</h3>
            <p>평점 내용</p>
          </div>
          <div class="modal-description">
            <h3>설명</h3>
            <p>설명 내용</p>
          </div>
          <div class="modal-my-rating">
            <p>내 별점</p>
            <div class="rating-stars">
              <img data-index=0 src="./star_empty.png" class="star" />
              <img data-index=1 src="./star_empty.png" class="star" />
              <img data-index=2 src="./star_empty.png" class="star" />
              <img data-index=3 src="./star_empty.png" class="star" />
              <img data-index=4 src="./star_empty.png" class="star" />
            </div>
            <p class="rating-message"><span class="rating">6</span><span class="rating-word">보통이에요.</span></p>
          </div>
        </div>
      </div> 
      </dialog>
      `;
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
    this.backdrop.addEventListener('click', this.hideModal.bind(this));
    this.modal.addEventListener('cancel', this.hideModal.bind(this));
    this.closeButton.addEventListener('click', this.hideModal.bind(this));
    this.starContainer.addEventListener('click', this.#handleClickStar.bind(this));
    this.starContainer.addEventListener('mouseover', this.#handleHoverStar.bind(this));
    this.starContainer.addEventListener('mouseleave', this.#handleLeaveStar.bind(this));

    return this;
  }

  #handleClickStar(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    const targetIndex = Number(target.dataset.index);
    let rating = 0;
    if (!targetIndex) return;

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

    this.ratingMessage.innerHTML = `<span class="rating">${String(rating)}</span><span class="rating-word">${
      STAR_COUNT_MAP[rating]
    }</span>`;

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

  hideModal() {
    this.node.remove();
    document.body.style.overflow = 'auto';
  }

  showModal() {
    this.modal.setAttribute('open', 'true');
    document.body.style.overflow = 'hidden';
  }
}

export default MovieDetailModal;
