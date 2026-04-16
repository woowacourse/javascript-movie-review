import { MovieDetailData } from './api.ts';

const $modalBackground = document.querySelector('#modalBackground') as HTMLElement | null;
const $modalContainer = document.querySelector('#modalContainer') as HTMLElement | null;

const RATING_MESSAGES: Record<number, string> = {
  2: '최악이에요',
  4: '별로에요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

// 모달 UI 여닫기 추상화
export const openModalUI = () => {
  $modalBackground?.classList.add('active');
  document.body.classList.add('modal-open');
};

export const closeModalUI = () => {
  $modalBackground?.classList.remove('active');
  document.body.classList.remove('modal-open');
};

// 모달 스켈레톤
export const showModalSkeleton = () => {
  if ($modalContainer) {
    $modalContainer.innerHTML = `
      <div class="modal-loading-wrapper">
        <h2>정보를 불러오는 중입니다...</h2>
      </div>
    `;
  }
};

// 모달 에러 메시지
export const showError = (movieId: number) => {
  if ($modalContainer) {
    $modalContainer.innerHTML = `
      <div class="modal-description">
        <h2>에러가 발생했습니다! 다시시도 버튼을 눌러주세요!</h2>
        <button id="retryModalButton" class="retry-btn" data-id="${movieId}">다시 시도하기</button>
      </div>
    `;
  }
};

// 모달 렌더링
export const renderModalContent = (data: MovieDetailData, myRating: number) => {
  if (!$modalContainer) return;

  const year = formatYear(data.release_date);
  const genres = formatGenres(data.genres);
  const posterUrl = getPosterUrl(data.poster_path);
  const ratingText = getRatingText(myRating);
  const starsHTML = generateStarsHTML(myRating);

  $modalContainer.innerHTML = /* html */ `
    ${createPosterHTML(posterUrl, data.title)}
    <div class="modal-description">
      ${createMovieHeaderHTML(data.title, year, genres, data.vote_average)}
      ${createMyRatingHTML(starsHTML, ratingText, myRating)}
      ${createPlotHTML(data.overview)}
    </div>
  `;
};

// 연도 추출
const formatYear = (date?: string) => (date ? date.split('-')[0] : '연도가 없습니다!');

// 장르 배열 문자열 변환
const formatGenres = (genres?: { name: string }[]) =>
  genres ? genres.map((genre) => genre.name).join(', ') : '장르가 없습니다!';

// 포스터 이미지
const getPosterUrl = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : './images/woowacourse_logo.png';

// 별점 텍스트 설정
const getRatingText = (rating: number) => (rating > 0 ? RATING_MESSAGES[rating] : '평가해주세요');

// 별점 이미지 HTML 생성
const generateStarsHTML = (myRating: number) => {
  return [2, 4, 6, 8, 10]
    .map((score) => {
      const imgSrc = score <= myRating ? './images/star_filled.png' : './images/star_empty.png';

      return `<img src="${imgSrc}" class="rate-star-img" data-score="${score}" alt="${score}점" />`;
    })
    .join('');
};

// 포스터 이미지 영역
const createPosterHTML = (posterUrl: string, title: string) => /* html */ `
  <div class="modal-image">
    <img src="${posterUrl}" alt="${title}" />
  </div>
`;

// 영화 헤더 영역
const createMovieHeaderHTML = (title: string, year: string, genres: string, voteAverage: number) => /* html */ `
  <h2>${title}</h2>
  <p class="category">${year} · ${genres}</p>
  <p class="rate">
    <span class="average-text">평균</span>
    <img src="./images/star_filled.png" class="average-star" />
    <span>${voteAverage.toFixed(1)}</span>
  </p>
  <hr />
`;

// 내 별점 영역
const createMyRatingHTML = (starsHTML: string, ratingText: string, myRating: number) => /* html */ `
  <div class="my-rating-container">
    <h3>내 별점</h3>
    <div class="star-rating" id="starRating">
      <div class="stars-wrapper">
        ${starsHTML}
      </div>
      <span class="rating-desc" id="ratingDescription">
        ${ratingText} 
        ${myRating > 0 ? `<span class="score-number">(${myRating}/10)</span>` : ''}
      </span>
    </div>
  </div>
  <hr />
`;

// 줄거리 영역
const createPlotHTML = (overview: string) => /* html */ `
  <div class="plot-container">
    <h3>줄거리</h3>
    <p class="detail">${overview || '줄거리 정보가 없습니다.'}</p>
  </div>
`;

// 별점 UI 업데이트
export const updateStarsUI = (score: number) => {
    updateStarImages(score);
    updateRatingText(score);
};

// 별점 이미지 칠해주는 함수
const updateStarImages = (score: number) => {
  const $stars = document.querySelectorAll('.rate-star-img');
  
  $stars.forEach(($star) => {
    const starScore = Number(($star as HTMLElement).dataset.score);
    const imgElement = $star as HTMLImageElement;
    // 점수에 따라 빈 별 / 채워진 별 이미지 경로 교체
    imgElement.src = starScore <= score ? './images/star_filled.png' : './images/star_empty.png';
  });
};

// 별점 텍스트 바꿔주는 함수
const updateRatingText = (score: number) => {
  const $description = document.querySelector('#ratingDescription');

  if (!$description) return;

  if (score > 0) {
    $description.innerHTML = `${RATING_MESSAGES[score]} <span class="score-number">(${score}/10)</span>`;
  } else {
    $description.innerHTML = '평가해주세요';
  }
};
