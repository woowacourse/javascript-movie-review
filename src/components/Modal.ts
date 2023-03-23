import './Modal.css';
import STAR_FILLED from '../image/star-filled.png';
import STAR_EMPTY from '../image/star-empty.png';
import { $ } from '../utils/common';
import { MovieInfo, MovieScoreInfo } from '../types/type';
import Movie from '../domain/Movie';

export interface HTMLModalElement extends HTMLElement {
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
    this.detailFetchEvent();
    this.setModalCloseEvent();
    this.setStarClickEvent();
    // this.renderStar();
  }

  render(): void {
    const category = this.getAttribute('category') || '';
    const myScore = this.getAttribute('my-score') || '0';
    const { title, imgUrl, score, description } = this.#detailMovieInfo;

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
                                <div id="modal-category" class="modal-category-skeleton">${category}</div>
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
                            <div id="modal-star-score" class="modal-star-score">
                                ${`<img class="modal-star" src="${STAR_FILLED}">`.repeat(fillStarCount)}
                                ${`<img class="modal-star" src="${STAR_EMPTY}">`.repeat(emptyStarCount)}
                            </div>
                            <span id="modal-my-score" class="modal-number-score"></span>
                            <span id="modal-my-comment" class="modal-comment"></span>
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
    if (myScore === 0) return '영화를 평가해주세요 !';
    if (myScore <= 2) return '최악이예요';
    if (myScore <= 4) return '별로예요';
    if (myScore <= 6) return '보통이에요';
    if (myScore <= 8) return '재미있어요';
    return '명작이에요';
  }

  async detailFetchEvent() {
    const modalCategory = $('#modal-category') as HTMLDivElement;
    const id = this.#detailMovieInfo.id;

    if (id === 0) return;

    const movieDetail = await new Movie().parsedDetailResult(id);
    modalCategory.classList.remove('modal-category-skeleton');

    const categories = movieDetail.category.map(item => item.name);

    modalCategory.innerText = categories.join(', ');
  }

  renderStar() {
    const stars = this.querySelectorAll('.modal-star') as NodeListOf<HTMLImageElement>;

    const id = this.#detailMovieInfo.id;
    const movieScore: MovieScoreInfo[] = JSON.parse(localStorage.getItem('movieScore') || '[]');
    const modalMyScore = $('#modal-my-score') as HTMLSpanElement;
    const modalMyComment = $('#modal-my-comment') as HTMLSpanElement;

    const movie = movieScore.find((item: MovieScoreInfo) => item.id === id);
    const score = movie?.id || 0;

    modalMyScore.innerText = score.toString();
    modalMyComment.innerText = this.getScoreComment(score.toString());

    const starIndex = score / 2 - 1;

    stars.forEach((imgItem, imgIndex) => {
      if (imgIndex <= starIndex) {
        imgItem.src = STAR_FILLED;
        return;
      }
      imgItem.src = STAR_EMPTY;
    });
  }

  setStarClickEvent() {
    const stars = this.querySelectorAll('.modal-star') as NodeListOf<HTMLImageElement>;

    stars.forEach((item, index) => {
      item.addEventListener('click', () => {
        const id = this.#detailMovieInfo.id;

        const movieScore = JSON.parse(localStorage.getItem('movieScore') || '[]');

        const findIndex = movieScore.findIndex((item: MovieScoreInfo) => item.id === id);

        const updatedMovieScore = movieScore.splice(findIndex, 1, { id, score: (Number(index) + 1) * 2 });

        localStorage.setItem('movieScore', JSON.stringify(updatedMovieScore));

        stars.forEach((imgItem, imgIndex) => {
          if (imgIndex <= index) {
            imgItem.src = STAR_FILLED;
            return;
          }
          imgItem.src = STAR_EMPTY;
        });

        // this.renderStar();
      });
    });
  }
}

export default Modal;
