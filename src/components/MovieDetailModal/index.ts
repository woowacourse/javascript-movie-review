import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { CLASS } from '../../constants/selector';
import { $ } from '../../utils/dom';

import './MovieDetailModal.style.css';

const MovieDetailModal = {
  template(movieId: string) {
    return `
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>해리 포터 20주년: 리턴 투 호그와트</h2>
          <button type="button">X</button>
        </div>
        <div class="movie-details">
          <div class="movie-detail-poster">
            <img src=${posterNotFoundImage} alt="해리 포터 20주년: 리턴 투 호그와트" />
          </div>
          <div class="movie-detail-content">
            <div class="movie-detail-info">
              <div class="movie-detail-genre">
                <p>액션, 코미디, 범죄</p>
                <div class="movie-detail-score">
                  <img src=${starFilledImage} alt="별점" />
                </div>
                <p>8.1</p>
              </div>
              <p class="movie-detail-desc">
              해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다.
              </p>
            </div>
            <div class="user-rating-container">
              <p>내 별점</p>
              <div class="user-rating-buttons">
                <button type="button"><img src=${starFilledImage} alt="별점" /></button>
                <button type="button"><img src=${starFilledImage} alt="별점" /></button>
                <button type="button"><img src=${starFilledImage} alt="별점" /></button>
                <button type="button"><img src=${starFilledImage} alt="별점" /></button>
                <button type="button"><img src=${starFilledImage} alt="별점" /></button>
              </div>
              <p>6</p>
              <p class="user-rating-desc">보통이에요</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  setEvent() {
    const modalBackground = $<HTMLDivElement>('.modal-background');

    modalBackground.addEventListener('click', MovieDetailModal.close);
    window.addEventListener('keydown', MovieDetailModal.onKeydownEscape);
  },

  removeEvent() {
    window.removeEventListener('keydown', MovieDetailModal.onKeydownEscape);
  },

  onKeydownEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') MovieDetailModal.close();
  },

  open(movieId: string) {
    const modalRoot = $<HTMLDivElement>('#modal-root');

    modalRoot.classList.remove(CLASS.HIDE);
    modalRoot.insertAdjacentHTML('beforeend', MovieDetailModal.template(movieId));
  },

  close() {
    const modalRoot = $<HTMLDivElement>('#modal-root');

    modalRoot.classList.add(CLASS.HIDE);
    modalRoot.innerHTML = '';
    MovieDetailModal.removeEvent();
  },
};

export default MovieDetailModal;
