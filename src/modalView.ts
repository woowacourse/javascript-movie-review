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
export const showError = () => {
  if ($modalContainer) {
    $modalContainer.innerHTML = `
      <div class="modal-description">
        <h2>에러가 발생했습니다! 모달창을 닫고 다시 켜주세요!</h2>
      </div>
    `;
  }
};

// 모달 렌더링
export const renderModalContent = (data: MovieDetailData, myRating: number) => {
  if (!$modalContainer) return;

  // 연도 추출
  const year = data.release_date ? data.release_date.split('-')[0] : '연도가 없습니다!';
  // 장르 배열 문자열 변환
  const genres = data.genres ? data.genres.map((genre) => genre.name).join(', ') : '장르가 없습니다!';
  // 포스터 이미지
  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
    : './images/woowacourse_logo.png'; // 이미지 없는 경우 임시처리
  // 별점 텍스트 설정
  const ratingText = myRating > 0 ? RATING_MESSAGES[myRating] : '평가해주세요';

  const starsHTML = [2, 4, 6, 8, 10].map(score => {
    const imgSrc = score <= myRating ? './images/star_filled.png' : './images/star_empty.png';
    
    return `<img src="${imgSrc}" class="rate-star-img" data-score="${score}" alt="${score}점" />`;
  }).join('');

  $modalContainer.innerHTML = /* html */ `
    <div class="modal-image">
      <img src="${posterUrl}" alt="${data.title}" />
    </div>
    <div class="modal-description">
      <h2>${data.title}</h2>
      <p class="category">${year} · ${genres}</p>
      <p class="rate">
        <span class="average-text">평균</span>
        <img src="./images/star_filled.png" class="average-star" />
        <span>${data.vote_average.toFixed(1)}</span>
      </p>
      <hr />

      <div class="my-rating-container">
        <h3>내 별점</h3>
        <div class="star-rating" id="starRating">
          <div class="stars-wrapper">
            ${starsHTML}
          </div>
          <span class="rating-desc" id="ratingDescription">
          ${ratingText} 
          ${myRating > 0 ? `<span class="score-number">(${myRating}/10)</span>` : ''}
          </span
        </div>
      </div>
      <hr />

      <div class="plot-container">
        <h3>줄거리</h3>
        <p class="detail">${data.overview || '줄거리 정보가 없습니다.'}</p>
      </div>
    </div>
  `;
};

// 별점 UI 업데이트
export const updateStarsUI = (score: number) => {
    const $stars = document.querySelectorAll('.rate-star-img');
    const $description = document.querySelector('#ratingDescription');
    
    $stars.forEach(($star) => {
      const starScore = Number(($star as HTMLElement).dataset.score);
      const imgElement = $star as HTMLImageElement;

      // 점수에 따라 빈 별 / 채워진 별 이미지 경로 교체
      imgElement.src = starScore <= score ? './images/star_filled.png' : './images/star_empty.png';
    });

    if ($description) {
      if (score > 0) {
        $description.innerHTML = `${RATING_MESSAGES[score]} <span class="score-number">(${score}/10)</span>`;
      } else {
        $description.innerHTML = '평가해주세요';
      }
    }
  };
