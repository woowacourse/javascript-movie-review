import './Modal.css';
import STAR_FILLED from '../image/star-filled.png';
import STAR_EMPTY from '../image/star-empty.png';
import { $, sliceScore, sliceSting } from '../utils/common';
import { MovieDetailInfo, MovieInfo, MovieScoreInfo } from '../types/type';
import Movie from '../domain/Movie';
import { HTMLMovieListItemElement } from './MovieListItem';

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
    this.setEscModalCloseEvent();
  }

  updateDetailModal() {
    this.render();
    this.renderStar();
    this.detailFetchEvent();
    this.setStarClickEvent();
    this.setModalCloseEvent();
    this.openModal();
  }

  render(): void {
    const STAR_COUNT = 5;
    const { title, imgUrl, score, description, categories, releaseDate, runningTime } = this.#detailMovieInfo;

    const slicedScore = sliceScore(score.toFixed(1));

    const releaseDateText = releaseDate ? releaseDate.replace(/-/g, '/') : '';

    const hour = (runningTime / 60).toFixed(0) !== '0' ? `${(runningTime / 60).toFixed(0)}시간` : '';
    const minute = runningTime % 60 !== 0 ? `${runningTime % 60}분` : '';
    const runningTimeText = runningTime !== 0 ? `${hour} ${minute}` : '';

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
                                <div id="modal-category" class="modal-category-skeleton">${categories}</div>
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

  setEscModalCloseEvent() {
    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.closeModal();
      }
    });
  }

  setModalCloseEvent(): void {
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
    const path = window.location.hash.replace('#', '');
    const URL = new URLSearchParams(path);

    const query = URL.get('q');

    modal.close();
    if (query) {
      window.location.hash = `?q=${query}`;
      return;
    }
    window.location.hash = ' ';
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

    const categories = movieDetail.categories;

    if (categories.length === 0) {
      modalCategory.innerText = '카테고리 없음';
      return;
    }

    modalCategory.innerText = categories;
  }

  renderStar() {
    const stars = this.querySelectorAll('.modal-star') as NodeListOf<HTMLImageElement>;

    const id = this.#detailMovieInfo.id;

    const movieScore: MovieScoreInfo[] = JSON.parse(localStorage.getItem('movieScore') || '[]');
    const modalMyScore = $('#modal-my-score') as HTMLSpanElement;
    const modalMyComment = $('#modal-my-comment') as HTMLSpanElement;

    const movie = movieScore.find((item: MovieScoreInfo) => item.id === id);
    const score = movie?.score || 0;

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
        const score = (Number(index) + 1) * 2;
        this.setMovieScore(score);
        this.renderStar();
        this.updateReviewedElement();
      });
    });
  }

  setMovieScore(score: number): void {
    const id = this.#detailMovieInfo.id;
    const movieScore: MovieScoreInfo[] = JSON.parse(localStorage.getItem('movieScore') || '[]');

    const findIndex = movieScore.findIndex((item: MovieScoreInfo) => item.id === id);

    if (findIndex === -1) {
      const updatedMovieScore = [...movieScore, { id, score }];
      localStorage.setItem('movieScore', JSON.stringify(updatedMovieScore));
      return;
    }

    const updatedMovieScore = movieScore;
    updatedMovieScore.splice(findIndex, 1, { id, score });
    localStorage.setItem('movieScore', JSON.stringify(updatedMovieScore));
  }

  async setMovieId(id: string) {
    if (!id) return;

    try {
      const movieDetail = await new Movie().parsedDetailResult(Number(id));

      this.#detailMovieInfo = movieDetail;
      this.updateDetailModal();
    } catch (error) {
      this.closeModal();
    }
  }

  updateReviewedElement() {
    const id = this.#detailMovieInfo.id;
    const movieItem = $(`#id${id}`) as HTMLMovieListItemElement;

    movieItem.updateReviewedElement();
  }
}

export default Modal;
