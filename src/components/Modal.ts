import './Modal.css';
import STAR_FILLED from '../image/star-filled.png';
import STAR_EMPTY from '../image/star-empty.png';
import { $ } from '../utils/common';
import { MovieInfo } from '../types/type';

export interface ModalHTMLInfo extends HTMLElement {
  connectedCallback: () => void;
  setModalAttributes: ({ id, title, imgUrl, score, description }: MovieInfo) => void;
  openModal: () => void;
}

class Modal extends HTMLElement {
  #detailMovieInfo: MovieInfo = {
    id: 0,
    title: '',
    imgUrl: '',
    score: 0,
    description: '',
  };

  connectedCallback(): void {
    this.render();
    this.setModalCloseEvent();
  }

  render(): void {
    const category = this.getAttribute('category');
    const myScore = this.getAttribute('my-score') || '0';
    const { id, title, imgUrl, score, description } = this.#detailMovieInfo;

    console.log(id, title, imgUrl, description);
    const fillStarCount = Math.round(Number(myScore)) / 2;
    const emptyStarCount = 5 - fillStarCount;

    this.innerHTML = /*html*/ `
        <dialog id="modal" class="modal-wrapper">
            <div id="modal-background" class="modal-background"></div> 
            <div class="modal">
                <header class="modal-header">
                    <div></div>
                    <div class="modal-header-title">${title}</div>
                    <div id="modal-close-button" class="mocal-cancle">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="modal-cancle-content">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </header>
                <main class="modal-main">
                    <div class="modal-main-image-container">
                        <movie-image imgUrl="${imgUrl}" title="${title}" width="300"></movie-image>
                    </div>
                    <div class="modal-main-content">
                        <div>
                            <div class="modal-main-category-score">
                                <div>${category}</div>
                                <div class="modal-score">
                                    ${score !== 0 ? `<img src="${STAR_FILLED}">` : `<img src="${STAR_EMPTY}">`}
                                    <span>${score}<span>
                                </div>
                            </div>
                            <p class="modal-description">
                            ${description}
                            </p>
                        </div>
                        <div class="modal-my-score-wrapper">
                            <span class="modal-my-score">내 별점</span>
                            <div class="modal-star-score">
                                ${`<img src="${STAR_FILLED}">`.repeat(fillStarCount)}
                                ${`<img src="${STAR_EMPTY}">`.repeat(emptyStarCount)}
                            </div>
                            <span class="modal-number-score">${myScore}</span>
                            <span class="modal-comment">${this.getScoreComment(myScore)}</span>
                        </div>
                    </div>
                </main>
            </div>
        </dialog> 
     `;
  }

  setModalCloseEvent(): void {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });

    $('#modal-background')?.addEventListener('click', () => this.closeModal());

    $('#modal-close-button')?.addEventListener('click', () => this.closeModal());
  }

  openModal(): void {
    const modal = $('#modal') as HTMLDialogElement;
    $('body')?.classList.add('overflow-hidden');
    modal.showModal();
  }

  closeModal(): void {
    const modal = $('#modal') as HTMLDialogElement;
    $('body')?.classList.remove('overflow-hidden');
    modal.close();
  }

  setModalAttributes({ id, title, imgUrl, score, description }: MovieInfo): void {
    this.#detailMovieInfo = { id, title, imgUrl, score, description };
  }

  getScoreComment(score: string): string {
    const myScore = Number(score);
    if (myScore === 0) return '아직 안 봤어요';
    if (myScore <= 2) return '최악이에요!';
    if (myScore <= 4) return '재미 없었어요';
    if (myScore <= 6) return '보통이에요';
    if (myScore <= 8) return '재밌게 봤어요';
    return '최고의 영화!';
  }

  static get observedAttributes() {
    return ['id'];
  }
}

export default Modal;
