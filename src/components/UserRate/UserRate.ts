import starImg from '../../images/star_filled.png';
import emptyStarImg from '../../images/star_empty.png';
import './UserRate.css';
import { getUserRateFromLocalStorage, updateUserRateToLocalStorage } from '../../store/UserRate';

const textRate = (rate: number) => {
  if (rate === 10) return '명작이에요';
  if (rate === 8) return '재미있어요';
  if (rate === 6) return '보통이에요';
  if (rate === 4) return '별로예요';
  if (rate === 2) return '최악이예요';
  return '아직 별점이 없어요';
};

class UserRate {
  #divElement = document.createElement('div');

  #rate: number;

  #movieId: string;

  constructor(movieId: number) {
    this.#divElement.classList.add('modal-user-star-container');
    this.#movieId = String(movieId);
    this.#rate = getUserRateFromLocalStorage(this.#movieId);

    this.#renderUserRate();
  }

  #renderUserRate() {
    this.#divElement.innerHTML = '';
    this.#rate = getUserRateFromLocalStorage(this.#movieId);
    this.#divElement.appendChild(this.#generateSubtitle());
    this.#divElement.appendChild(this.#generateStarBox());
    this.#divElement.appendChild(this.#generateRate());
    this.#divElement.appendChild(this.#generateText());
  }

  #generateSubtitle() {
    const span = document.createElement('span');

    span.classList.add('text-subtitle', 'modal-user-rate-title');
    span.textContent = '내 별점';

    return span;
  }

  #generateStarBox() {
    const box = document.createElement('div');

    box.classList.add('modal-user-star-box');
    box.appendChild(this.#generateButton());

    return box;
  }

  /* eslint-disable max-lines-per-function */
  #generateButton() {
    const container = document.createElement('div');

    for (let i = 1; i <= 5; i++) {
      const button = document.createElement('button');
      const img = document.createElement('img');

      button.type = 'button';
      button.id = `star-${i}`;
      button.classList.add('modal-user-star-button');
      img.src = i * 2 <= this.#rate ? starImg : emptyStarImg;
      button.appendChild(img);
      container.appendChild(button);
    }

    this.#addClickEvent(container);

    return container;
  }

  #addClickEvent(buttonContainer: HTMLDivElement) {
    buttonContainer.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const buttonId = target.closest('button')?.id.split('-')[1];
      const rate = String(Number(buttonId) * 2);

      updateUserRateToLocalStorage(this.#movieId, rate);
      this.#renderUserRate();
    });
  }

  #generateRate() {
    const span = document.createElement('span');

    span.classList.add('text-body', 'modal-rate');
    span.textContent = String(this.#rate);

    return span;
  }

  #generateText() {
    const span = document.createElement('span');

    span.classList.add('text-body', 'modal-rate-text');
    span.textContent = textRate(this.#rate);

    return span;
  }

  get element() {
    return this.#divElement;
  }
}

export default UserRate;
