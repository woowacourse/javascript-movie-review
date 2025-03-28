import { MovieData } from '../../../../types/movie';
import { calculateRate, getRatingMessage, getStarSelectionArray } from '../../../domain/MovieRateManager';

interface MovieDetailOptions {
  data: MovieData;
}

export class MovieDetail {
  #container;
  #data: MovieData;

  #selectedStars: number = 0;

  constructor({ data }: MovieDetailOptions) {
    this.#container = document.createElement('div');
    this.#container.classList.add('movie__detail-container');

    this.#data = data;

    this.#getStoredRating();

    this.render();
    this.#bindIconClickEvent();
  }

  get element() {
    return this.#container;
  }

  render() {
    this.#container.innerHTML = `
    <div class="movie__detail-image">
      <img src=${this.#data.imgUrl} />
    </div>
    <div class="movie__detail-description">
      <h2 class="movie__detail-title">${this.#data.title}</h2>
      <p class="movie__detail-category">${this.#data.releasedDate} · ${this.#data.category}</p>
      <p class="movie__detail-rate"><img src="./star_filled.png" class="star" /><span class="text-body rate__detail">${
        this.#data.score
      }</span></p>
      <hr />
      <h3 class="text-body">내 별점</h3>
      <div class="myrate"> 
      <div class="myrate__panel">
        <div class="myrate__icons">
      ${this.#renderStarIcons()}
        </div>
        <p class="myrate__score text-body">
      (${calculateRate(this.#selectedStars)}/10)
        </p>
    </div>
        <p class="myrate__message text-body">
      ${getRatingMessage(this.#selectedStars)}
        </p>
      </div>
      <hr />
      <h3 class="text-body">줄거리</h3>
      <p class="detail">
      ${this.#data.description.length !== 0 ? this.#data.description : '줄거리가 없습니다'}
      </p>
    </div>
     `;
  }

  #getStoredRating() {
    const storedSelectedStars = localStorage.getItem(String(this.#data.id));
    if (storedSelectedStars) {
      this.#selectedStars = Number(storedSelectedStars);
    }
  }

  #updateMyRateIcons() {
    const IconsContainer = this.#container.querySelector('.myrate__icons');
    if (!IconsContainer) return;

    IconsContainer.innerHTML = `${this.#renderStarIcons()}`;
    this.#bindIconClickEvent();
  }

  #updateMyRateScore() {
    const scoreContainer = this.#container.querySelector('.myrate__score');
    if (!scoreContainer) return;

    scoreContainer.innerHTML = `(${calculateRate(this.#selectedStars)}/10)`;
  }

  #updateMyRateMessage() {
    const messageContainer = this.#container.querySelector('.myrate__message');
    if (!messageContainer) return;

    messageContainer.innerHTML = `${getRatingMessage(this.#selectedStars)}`;
  }

  #renderStarIcons() {
    return getStarSelectionArray(this.#selectedStars)
      .map(
        (star, index) =>
          `<img src="${this.#getSelectedStarSrc(star)}" data-index="${index + 1}" class="myrate__icon" />`,
      )
      .join('');
  }

  #getSelectedStarSrc(isFilled: boolean) {
    return isFilled ? './star_filled.png' : './star_empty.png';
  }

  #bindIconClickEvent() {
    this.#container.querySelectorAll('.myrate__icon').forEach((element) =>
      element.addEventListener('click', (event) => {
        if (!event.target) return;
        if (!(event.target instanceof HTMLElement)) return;

        this.#selectedStars = Number(event.target.dataset.index);
        localStorage.setItem(String(this.#data.id), String(this.#selectedStars));

        this.#updateMyRateIcons();
        this.#updateMyRateScore();
        this.#updateMyRateMessage();
      }),
    );
  }
}
