import CustomModal from './common/CustomModal';
import DefaultPoster from '../../images/default_poster.png';

import { MODAL_CLOSE_ICON, STAR_ICON_LARGE, STAR_FILLED_ICON } from '../icons';

import {
  MODAL_SKELETON_TEMPLATE,
  VOTE_ICON_COUNT,
  VOTE_SCORE_LOCAL_STORAGE_KEY,
} from '../domain/constants';
import { $ } from '../utils/domUtils';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';

import { MovieDetailResponse } from '../domain/remotes/movieDetail';

type VoteScoreInfo = Record<number, number> | null;

export default class MovieDetailModal extends HTMLElement {
  #movieId = 0;
  #voteScore = 0;

  connectedCallback() {
    $('.modal-close-button')?.addEventListener('click', () => this.handleCloseButtonClick());
  }

  render(movieDetail: MovieDetailResponse) {
    const { id, title, genres, overview, poster_path, vote_average } = movieDetail;

    this.init(id);
    this.innerHTML = /* html */ `
      <header class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close-button" aria-label="영화 상세 정보 모달 닫기">${MODAL_CLOSE_ICON}</button>
      </header>
      <div class="detail-container">
        <figure class="modal-thumbnail-wrapper">
          <img
          class="modal-thumbnail skeleton"
          src=${
            poster_path === 'null'
              ? DefaultPoster
              : `https://image.tmdb.org/t/p/w500/${poster_path}`
          }
          loading="lazy"
          alt="${title}"
          />
        </figure>
        <section class="movie-detail">
          <div class="flex align-center">
            <p>${genres.map((genre) => genre.name).join(', ')}</p>
            <p class="vote-average">${STAR_FILLED_ICON} ${vote_average.toFixed(1)}</p>
          </div>
          <p class="overview">${overview === '' ? '등록된 줄거리가 없습니다.' : overview}</p>
          <section class="vote">
            <p class="my-vote">내 별점</p>
            <div class="icon-container">
              ${Array(VOTE_ICON_COUNT)
                .fill(0)
                .map((_, index) => {
                  return `<i class="vote-icon" data-vote-score="${
                    (index + 1) * 2
                  }">${STAR_ICON_LARGE}</i>`;
                })
                .join('')}
            </div>
            <p class="score">${this.#voteScore}</p>
            <p class="review">${this.getOneLineReview(this.#voteScore)}</p>
          </section>
        </section>
      </div>
    `;

    this.fillVoteIcons(this.#voteScore);
    this.bindEvents();
  }

  showSkeleton() {
    this.innerHTML = MODAL_SKELETON_TEMPLATE;
  }

  init(movieId: number) {
    this.#movieId = movieId;
    this.#voteScore = this.loadVoteScore();
  }

  loadVoteScore() {
    const voteScoreInfo: VoteScoreInfo = getLocalStorage(
      VOTE_SCORE_LOCAL_STORAGE_KEY
    ) as VoteScoreInfo;

    if (voteScoreInfo === null) return 0;

    return voteScoreInfo[this.#movieId] ?? 0;
  }

  bindEvents() {
    $('.modal-close-button')?.addEventListener('click', () => this.handleCloseButtonClick());
    $('.icon-container')?.addEventListener('click', (e) => this.handleVoteIconClick(e));
    $('.modal')?.addEventListener('close', () => this.handleModalClose());
  }

  handleCloseButtonClick() {
    const $customModal = $('custom-modal') as CustomModal;
    $customModal.closeModal();
  }

  handleVoteIconClick(e: Event) {
    const $target = e.target as HTMLElement;
    const $voteIcon = $target.closest('.vote-icon') as HTMLElement;

    if (!$voteIcon) return;

    const voteScore = Number($voteIcon.dataset.voteScore);

    this.updateVoteScore(voteScore);
  }

  handleModalClose() {
    this.saveVoteScore();
  }

  updateVoteScore(voteScore: number) {
    this.#voteScore = voteScore;
    this.fillVoteIcons(voteScore);
    $('.score')!.textContent = `${voteScore}`;
    $('.review')!.textContent = this.getOneLineReview(voteScore);
  }

  fillVoteIcons(voteScore: number) {
    const $icons = $('.icon-container')?.querySelectorAll('.star');
    const maxVoteIconIndex = voteScore / 2 - 1;

    $icons?.forEach((icon, index) => {
      if (index <= maxVoteIconIndex) {
        icon.classList.add('filled');
      } else {
        icon.classList.remove('filled');
      }
    });
  }

  saveVoteScore() {
    const voteScoreInfo: VoteScoreInfo = getLocalStorage(
      VOTE_SCORE_LOCAL_STORAGE_KEY
    ) as VoteScoreInfo;

    if (voteScoreInfo === null) {
      setLocalStorage(VOTE_SCORE_LOCAL_STORAGE_KEY, {
        [this.#movieId]: this.#voteScore,
      });
    } else {
      setLocalStorage(VOTE_SCORE_LOCAL_STORAGE_KEY, {
        ...voteScoreInfo,
        [this.#movieId]: this.#voteScore,
      });
    }
  }

  getOneLineReview(voteScore: number) {
    switch (voteScore) {
      case 2:
        return '최악이에요';
      case 4:
        return '별로에요';
      case 6:
        return '보통이에요';
      case 8:
        return '재미있어요';
      case 10:
        return '명작이에요';
      default:
        return '별점 남기기';
    }
  }
}

customElements.define('movie-detail-modal', MovieDetailModal);
