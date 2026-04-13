import { fetchMovieDetail } from './api.ts';
import { reviewStorage } from './reviewStorage.ts';
import * as modalView from './modalView.ts';

// 모달 열기
export const openModal = async (movieId: number) => {
  modalView.openModalUI();
  modalView.showModalSkeleton();

  try {
    const data = await fetchMovieDetail(movieId);
    // 스토리지에서 내 별점 가져오기
    const myRating = (await reviewStorage.getRating(movieId)) || 0;

    modalView.renderModalContent(data, myRating);
    initStarRatingEvents(movieId, myRating);
  } catch (error) {
    modalView.showError();
  }
};

// 별점 매기기 이벤트
const initStarRatingEvents = (movieId: number, savedRating: number) => {
  const $starContainer = document.querySelector('#starRating');
  let currentSavedRating = savedRating;

  $starContainer?.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('rate-star-img')) {
      const hoverScore = Number(target.dataset.score);
      modalView.updateStarsUI(hoverScore); // 마우스 올린 곳까지 색칠
    }
  });

  $starContainer?.addEventListener('mouseout', () => {
    modalView.updateStarsUI(currentSavedRating); // 마우스를 빼면 기존 점수로 복구
  });

  $starContainer?.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('rate-star-img')) {
      const clickedScore = Number(target.dataset.score);
      currentSavedRating = clickedScore; // 기존 점수를 클릭한 점수로 업데이트
      modalView.updateStarsUI(clickedScore); // 클릭한 점수로 점수 변경

      await reviewStorage.saveRating(movieId, clickedScore); // 변경된 점수를 저장
    }
  });
};

// 모달 창 닫기 이벤트 추가
const initModalCloseEvents = () => {
  const $closeModalButton = document.querySelector('#closeModal');
  const $modalBackground = document.querySelector('#modalBackground');

  // 닫기 버튼 클릭할 때
  if ($closeModalButton) {
    $closeModalButton.addEventListener('click', modalView.closeModalUI);
  }

  // 모달 창 바깥 배경 클릭하면
  if ($modalBackground) {
    $modalBackground.addEventListener('click', (event) => {
      if (event.target === $modalBackground) {
        modalView.closeModalUI();
      }
    });
  }

  // ESC 키 눌렀을 때
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && $modalBackground?.classList.contains('active')) {
      modalView.closeModalUI();
    }
  });
};

initModalCloseEvents();
