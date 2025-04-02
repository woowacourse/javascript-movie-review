import { MovieData } from '../../../../types/movie';
import { DEBUG_ERROR, DEBUG_ERROR_MESSAGE } from '../../../constants/debugErrorMessage';
import Button from '../../common/button/Button';
import { Modal } from '../../common/modal/Modal';
import { MovieDetail } from '../movie-detail/MovieDetail';
import { mainBannerSkeletonTemplate } from './mainBannerSkeletonTemplate';

class MainBanner {
  #container: HTMLElement;
  #modal: Modal | null = null;

  #data: MovieData | null = null;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-banner');
    this.#data = null;

    this.render();
  }

  render() {
    if (!this.#data) {
      this.#container.innerHTML = `${mainBannerSkeletonTemplate}`;
      return;
    }
    this.#container.innerHTML = `
       <div class="overlay" aria-hidden="true">
         <img class="main-banner__image" src=${this.#data.imgUrl} alt=${this.#data.title} />
       </div>
       
       <div class="main-banner__info">

         <div class="main-banner__rate">
           <img src="./star_empty.png" class="main-banner__rating-star" alt="비어있는 별점 아이콘"/>
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
  }

  setData(data: MovieData) {
    this.#data = data;
    this.render();
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
    if (!this.#data) throw new Error(DEBUG_ERROR_MESSAGE.NO_DATA);

    const movieDetail = new MovieDetail({ data: this.#data }).element;

    this.#container.appendChild(this.#modalElement());

    if (!this.#modal) throw new Error(DEBUG_ERROR.getNoComponentMessage('Modal'));
    this.#modal.setContent(movieDetail);
    this.#modal.open();
  }

  get element() {
    return this.#container;
  }
}

export default MainBanner;
