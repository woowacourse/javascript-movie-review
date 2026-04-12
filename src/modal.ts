import { fetchMovieDetail, MovieDetailData } from './api.ts';
import { reviewStorage } from './reviewStorage.ts';

const $modalBackground = document.querySelector('#modalBackground') as HTMLElement | null;
const $modalContainer = document.querySelector('#modalContainer') as HTMLElement | null;
const $closeModalButton = document.querySelector('#closeModal') as HTMLButtonElement | null;

const RATING_MESSAGES: Record<number, string> = {
  2: '최악이에요',
  4: '별로에요',
  6: '보통이에요',
  8: '재미있어요',
  10: '명작이에요',
};

export const openModal = async (movieId: number) => {
  if (!$modalBackground || !$modalContainer) return;

  // 모달 창 보이게하고 스크롤 방지
  $modalBackground.classList.add('active');
  document.body.classList.add('modal-open');

  // 스켈레톤 필요
  $modalContainer.innerHTML = `<div class="modal-description"><h2>정보를 불러오는 중입니다...</h2></div>`;

  try {
    const data = await fetchMovieDetail(movieId);
    // 스토리지에서 내 별점 가져오기
    const myRating = (await reviewStorage.getRating(movieId)) || 0;

    renderModalContent(data, myRating);
    initStarRatingEvents(movieId, myRating);
  } catch (error) {
    if (error instanceof Error) {
      $modalContainer.innerHTML = `<div class="modal-description"><h2>${error.message}</h2></div>`;
    }
  }
};

const renderModalContent = (data: MovieDetailData, myRating: number) => {
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
        <span>평균</span>
        <img src="./images/star_filled.png" class="star" />
        <span>${data.vote_average}</span>
      </p>
      <hr />

      <div class="my-rating-container">
        <h3>내 별점</h3>
        <div class="star-rating" id="starRating">
          ${starsHTML}
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

// 별점 매기기 이벤트
const initStarRatingEvents = (movieId: number, savedRating: number) => {
  const $starContainer = document.querySelector('#starRating');
  const $stars = document.querySelectorAll('.rate-star-img');
  const $description = document.querySelector('#ratingDescription');
  
  let currentSavedRating = savedRating;

  // 점수에 따라 별 색깔과 텍스트 변경
  const updateStarsUI = (score: number) => {
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

  $starContainer?.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('rate-star-img')) {
      const hoverScore = Number(target.dataset.score);
      updateStarsUI(hoverScore); // 마우스 올린 곳까지 색칠
    }
  });

  $starContainer?.addEventListener('mouseout', () => {
    updateStarsUI(currentSavedRating); // 마우스를 빼면 기존 점수로 복구
  });

  $starContainer?.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('rate-star-img')) {
      const clickedScore = Number(target.dataset.score);
      currentSavedRating = clickedScore; // 기존 점수를 클릭한 점수로 업데이트
      updateStarsUI(clickedScore); // 클릭한 점수로 점수 변경
      
      await reviewStorage.saveRating(movieId, clickedScore); // 변경된 점수를 저장
    }
  });
};

const closeModal = () => {
  if (!$modalBackground) return;
  $modalBackground.classList.remove('active');
  document.body.classList.remove('modal-open');
};

// 모달 창 닫기 이벤트 추가
// 닫기 버튼 클릭할 때
if ($closeModalButton) {
  $closeModalButton.addEventListener('click', closeModal);
}

// 모달 창 바깥 배경 클릭하면
if ($modalBackground) {
  $modalBackground.addEventListener('click', (event) => {
    if (event.target === $modalBackground) {
      closeModal();
    }
  });
}

// ESC 키 눌렀을 때
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && $modalBackground?.classList.contains('active')) {
    closeModal();
  }
});
