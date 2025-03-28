import { MovieData } from '../../../../types/movie';
import Button from '../../common/button/Button';
import { Modal } from '../../common/modal/Modal';
import { MovieDetail } from '../movie-detail/MovieDetail';

interface MovieBannerProps {
  data: MovieData;
}

class MainBanner {
  #container: HTMLElement;
  #modal: Modal | null = null;

  #data: MovieData;

  constructor({ data }: MovieBannerProps) {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-banner');
    this.#data = data;

    this.render();
  }

  render() {
    this.#container.innerHTML = `
       <div class="overlay" aria-hidden="true">
         <img class="main-banner__image" src=${this.#data.imgUrl} alt=${this.#data.title} />
       </div>
       
       <div class="main-banner__info">

         <div class="main-banner__rate">
           <img src="./star_empty.png" class="main-banner__rating-star" />
           <span class="main-banner__rate-value text-subtitle">${this.#data.score}</span>
         </div>

         <div class="main-banner__title text-title">${this.#data.title}</div>
       </div>
    `;
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('main-banner__button');
    buttonContainer.appendChild(this.#detailButtonElement());

    const mainBannerInfo = this.#container.querySelector('.main-banner__info');
    if (mainBannerInfo) {
      mainBannerInfo.appendChild(buttonContainer);
    }
    this.#container.appendChild(this.#modalElement());
  }

  #detailButtonElement() {
    return new Button({
      size: 'small',
      innerText: '자세히 보기',
      onclick: () => this.#bindDetailButtonClickEvent(),
    }).element;
  }

  #modalElement() {
    this.#modal = new Modal();
    return this.#modal.element;
  }

  #bindDetailButtonClickEvent() {
    const movieDetail = new MovieDetail({ data: this.#data }).element;
    if (!this.#modal) return;
    this.#modal.setContent(movieDetail);
    this.#modal.open();
  }

  get element() {
    return this.#container;
  }
}

export default MainBanner;
