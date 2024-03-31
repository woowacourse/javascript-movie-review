import { Movie } from '../../index.d';
import closeButtonImg from '../../images/close_button.png';
import starImg from '../../images/star_filled.png';
import emptyStarImg from '../../images/star_empty.png';
import './DetailModal.css';

class DetailModal {
  #modalElement = document.querySelector('dialog');

  #movie: Movie;

  #count = 3;

  constructor(movie: any) {
    this.#movie = movie;
    this.#generateContainer();
  }

  #generateContainer() {
    const container = document.createElement('div');

    container.classList.add('modal-container');

    container.appendChild(this.#generateHeader());
    container.appendChild(this.#generateCloseButton());
    container.appendChild(this.#generateContent());
    this.#modalElement?.appendChild(container);
  }

  #generateHeader() {
    const container = document.createElement('div');
    const title = document.createElement('h3');

    container.classList.add('modal-header');
    title.classList.add('text-title', 'modal-title');
    title.innerText = this.#movie.title;

    container.appendChild(title);

    return container;
  }

  #generateCloseButton() {
    const button = document.createElement('button');
    const img = document.createElement('img');

    img.src = closeButtonImg;
    button.classList.add('modal-button');
    button.appendChild(img);
    this.#addCloseButtonEvent(button);

    return button;
  }

  /* eslint-disable max-lines-per-function */
  #generateContent() {
    const container = document.createElement('div');
    const content = /* html */ `
        <img src="https:image.tmdb.org/t/p/w220_and_h330_face${this.#movie.poster_path}" class="modal-img">
        <div class="modal-content">
          <div class="modal-movie-info">
            <div class="modal-genre-star-box">
              <div class="modal-genre text-body">
                액션, 코미디, 범죄
              </div>
              <div class="modal-star">
                <img src=${starImg}> <span class="text-body">${this.#movie.vote_average.toFixed(2)}</span>
              </div>
            </div>
            <p class="modal-description text-body">
              ${this.#movie.overview}
            </p>
          </div>
          <div class="modal-user-star-container">
            <span class="text-subtitle">내 별점</span>
            <div class="modal-user-star-box">
             ${this.#generateStarImg()}${this.#generateEmptyStarImg()}
            </div>
            <span class="text-body">${this.#count * 2}</span>
            <span class="text-body">보통이에요</span>
          </div>
        </div>
    `;

    container.classList.add('modal-content-container');
    container.innerHTML = content;

    return container;
  }

  #addCloseButtonEvent(button: HTMLButtonElement) {
    const modal = document.querySelector('dialog');

    if (modal) {
      button.addEventListener('click', () => {
        modal.close();
      });
    }
  }

  #generateStarImg() {
    const img = /* html */ `
    <button type="button" class="modal-user-star-button filled"><img src="${starImg}"></button>
    `;
    return img.repeat(this.#count);
  }

  #generateEmptyStarImg() {
    const img = /* html */ `
    <button type="button" class="modal-user-star-button empty"><img src="${emptyStarImg}"></button>
    `;
    return img.repeat(5 - this.#count);
  }

  get element() {
    return this.#modalElement;
  }
}

export default DetailModal;
