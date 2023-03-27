import './Modal.css';
import Movie from '../domain/Movie';
import userMovieScore from '../domain/userMovieScore';
import { $, convertHourAndMinute } from '../utils/common';
import { setHashURL, sliceScore, sliceSting } from '../utils/domain';
import STAR_FILLED from '../image/star-filled.png';
import STAR_EMPTY from '../image/star-empty.png';
import { HTMLMovieListItemElement } from './MovieListItem';
import { MovieDetailInfo, MovieInfo, MovieScoreInfo } from '../types/type';
import { SCORE_COMMENT, SCROLL_HIDDEN_CLASSNAME } from '../constants';

export interface HTMLModalElement extends HTMLElement {
  connectedCallback: () => void;
  updateDetailModal: () => void;
  setModalAttributes: ({ id, title, imgUrl, score, description }: MovieInfo) => void;
  openModal: () => void;
  closeModal: () => void;
  setMovieId: (id: string) => void;
}

class Modal extends HTMLElement {
  #detailMovieInfo: MovieDetailInfo = {
    id: 0,
    title: '',
    imgUrl: '',
    score: 0,
    description: '',
    categories: '',
    runningTime: 0,
    releaseDate: '',
  };

  connectedCallback(): void {
    this.render();
    this.setCloseModalKeydownEvent();
  }

  updateDetailModal(): void {
    this.render();
    $('#modal-category')?.classList.remove('modal-category-skeleton');
    this.renderStar();
    this.renderScoreText();
    this.setStarClickEvent();
    this.setCloseModalEvent();
    this.openModal();
  }

  render(): void {
    const STAR_COUNT = 5;
    const { title, imgUrl, score, description, categories, releaseDate, runningTime } = this.#detailMovieInfo;

    const categoriesText = categories !== '' ? categories : '카테고리 없음';
    const slicedScore = sliceScore(score.toFixed(1));
    const releaseDateText = releaseDate ? releaseDate.replace(/-/g, '/') : '';
    const runningTimeText = convertHourAndMinute(runningTime);

    this.innerHTML = /*html*/ `
        <dialog id="modal" class="modal-wrapper">
            <div id="modal-background" class="modal-background"></div> 
            <div class="modal">
                <header class="modal-header">
                    <div></div>
                    <div class="modal-header-title" title="${title}">${sliceSting(title)}</div>
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
                                <div id="modal-category" class="modal-category-skeleton" title="카테고리">${categoriesText}</div>
                                <movie-score score="${slicedScore}" class="modal-score-wrapper"></movie-score>
                            </div>
                            <div class="modal-main-date-time">
                              <div class="modal-date" title="개봉일">${releaseDateText}</div>
                              <div class="modal-running-time" title="상영 시간">${runningTimeText}</div>
                            </div>
                            <p class="modal-description">
                            ${description}
                            </p>
                        </div>
                        <div class="modal-my-score-wrapper">
                            <span class="modal-my-score">내 별점</span>
                            <div id="modal-star-score" class="modal-star-score">
                                ${`<img class="modal-star" src="${STAR_EMPTY}">`.repeat(STAR_COUNT)}
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

  setCloseModalKeydownEvent(): void {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  setCloseModalEvent(): void {
    $('#modal-background')?.addEventListener('click', () => this.closeModal());

    $('#modal-close-button')?.addEventListener('click', () => this.closeModal());
  }

  openModal(): void {
    const modal = $('#modal') as HTMLDialogElement;

    $('body')?.classList.add(SCROLL_HIDDEN_CLASSNAME);
    modal.showModal();
  }

  closeModal(): void {
    const modal = $('#modal') as HTMLDialogElement;

    $('body')?.classList.remove(SCROLL_HIDDEN_CLASSNAME);
    modal.close();
    setHashURL();
  }

  getScoreComment(score: string): string {
    const myScore = Number(score) / 2;

    return SCORE_COMMENT[myScore];
  }

  renderStar() {
    const stars = this.querySelectorAll('.modal-star') as NodeListOf<HTMLImageElement>;

    const score = userMovieScore.getScore(this.#detailMovieInfo.id);

    const starIndex = score / 2 - 1;

    stars.forEach((imgItem, imgIndex) => {
      if (imgIndex <= starIndex) {
        imgItem.src = STAR_FILLED;
        return;
      }
      imgItem.src = STAR_EMPTY;
    });
  }

  renderScoreText() {
    const modalMyScore = $('#modal-my-score') as HTMLSpanElement;
    const modalMyComment = $('#modal-my-comment') as HTMLSpanElement;

    const score = userMovieScore.getScore(this.#detailMovieInfo.id);

    modalMyScore.innerText = score.toString();
    modalMyComment.innerText = this.getScoreComment(score.toString());
  }

  setStarClickEvent() {
    const stars = this.querySelectorAll('.modal-star') as NodeListOf<HTMLImageElement>;

    stars.forEach((item, index) => {
      item.addEventListener('click', () => {
        const score = (Number(index) + 1) * 2;
        this.setMovieScore(score);
        this.renderStar();
        this.renderScoreText();
        this.updateMovieItemReviewed();
      });
    });
  }

  setMovieScore(score: number): void {
    const id = this.#detailMovieInfo.id;

    userMovieScore.setLocalStorage({ id, score });
  }

  setMovieId(id: string) {
    if (!id) return;

    try {
      this.renderDetailModal(id);
    } catch (error) {
      this.closeModal();
    }
  }

  async renderDetailModal(id: string) {
    const movieDetail = Movie.parsedDetailResult(Number(id));
    this.#detailMovieInfo = await movieDetail;
    this.updateDetailModal();
  }

  updateMovieItemReviewed() {
    const id = this.#detailMovieInfo.id;
    const movieItem = $(`#id${id}`) as HTMLMovieListItemElement;

    movieItem.updateReviewedElement();
  }
}

export default Modal;
