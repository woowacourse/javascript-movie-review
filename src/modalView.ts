import { MovieDetailData } from './api.ts';
import { createModalHTML, getUpdatedRatingHTML } from './modalHtmlTemplate.ts';

const $modalBackground = document.querySelector('#modalBackground') as HTMLElement | null;
const $modalContainer = document.querySelector('#modalContainer') as HTMLElement | null;

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
  $modalContainer.innerHTML = createModalHTML(data, myRating);
};

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

  if ($description) {
    $description.innerHTML = getUpdatedRatingHTML(score);
  }
};
