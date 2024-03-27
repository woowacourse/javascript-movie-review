import { POSTER_BASE_URL } from '../../api';
import { STAR_EMPTY, STAR_FILLED } from '../../resource';

interface Props {
  onCloseButtonClick: () => void;
}

const MovieDetail = ({ onCloseButtonClick }: Props) => {
  const container = document.createElement('div');

  container.classList.add('movie-detail-container');

  container.appendChild(MovieDetailTitle({ onCloseButtonClick }));
  container.insertAdjacentHTML(
    'beforeend',
    /* html */ `
    <div class="movie-detail-content">
      <div class="movie-detail-poster">
        <img src="${POSTER_BASE_URL}/mJYDpb6fRIzwgG0csBJp3zjNSSV.jpg" />
      </div>
      <div class="movie-detail-description">
        <div class="movie-detail-text-content">
          <div class="genre-info">
            <span>액션, 코미디, 범죄</span>
            <span class="movie-detail-vote-average"><img src="${STAR_FILLED}" /> 8.1</span>
          </div>
          
          <p class="overview">
            해리 포터 영화 시리즈가 다룬 주제들을 챕터로 나누어 다루었으며, 배우들의 영화 촬영장에서의 에피소드들과 감독들의 설명이 이어졌다. DVD 코멘터리와 비슷한 구성이지만, 영화에 참여하기까지의 일련의 오디션 과정과 시리즈가 끝난 후의 배우들의 커리어 등에 대해서 광범위하게 다루고 있다. 또한 세상을 떠난 배우들에 대한 기억들을 회상하는 시간도 가졌다.
          </p>
        </div>
        <div class="review-container">
          <span class="my-stars">내 별점</span>
          <div class="stars">
            <img src="${STAR_FILLED}" />
            <img src="${STAR_FILLED}" />
            <img src="${STAR_FILLED}" />
            <img src="${STAR_EMPTY}" />
            <img src="${STAR_EMPTY}" />
          </div>
          <span class="my-stars">6</span>
          <span class="my-stars">보통이에요</span>
        </div>
      </div>
    </div>
  `,
  );

  return container;
};

const MovieDetailTitle = ({ onCloseButtonClick }: Props) => {
  const container = document.createElement('div');
  const title = document.createElement('h2');
  const closeButton = document.createElement('button');

  container.classList.add('movie-detail-title-container');
  title.classList.add('movie-detail-title');
  closeButton.classList.add('movie-detail-close-button');

  title.textContent = '해리포터 20주년: 리턴 투 호그와트';
  closeButton.innerHTML = /* html */ `
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7665 1.54966L12.38 0L6.88315 6.14368L1.38632 0L-0.000183105 1.54966L5.49665 7.69333L-0.000183105 13.837L1.38632 15.3867L6.88315 9.24299L12.38 15.3867L13.7665 13.837L8.26965 7.69333L13.7665 1.54966Z" fill="#F1F1F1"/>
    </svg>
  `;

  container.appendChild(title);
  container.appendChild(closeButton);

  closeButton.addEventListener('click', () => onCloseButtonClick());

  return container;
};

export default MovieDetail;
