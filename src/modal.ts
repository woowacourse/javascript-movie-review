import { fetchMovieDetail } from './api.ts';
import type { ReviewStorage } from './reviewStorage.ts';
import * as modalView from './modalView.ts';

const modalState = {
  movieId: 0,
  savedRating: 0,
  storage: null as ReviewStorage | null,
};

export const setModalStorage = (storage: ReviewStorage) => {
  modalState.storage = storage;
}

// 모달 열기
export const openModal = async (movieId: number) => {
  modalView.openModalUI();
  modalView.showModalSkeleton();

  // 영화 ID 기록을 fetch 전으로 옮김
  modalState.movieId = movieId;

  try {
    const data = await fetchMovieDetail(movieId);

    // movieId가 바뀌었는지 체크해서, 다른 Id면 return
    if (modalState.movieId !== movieId) return;

    // 스토리지에서 내 별점 가져오기
    modalState.savedRating = (await modalState.storage?.getRating(movieId)) || 0;

    modalView.renderModalContent(data, modalState.savedRating);
  } catch (error) {
    // 에러가 났을 때도 movieId가 유지되는지 확인
    if (modalState.movieId === movieId) {
      modalView.showError(movieId);
    }
  }
};

// 마우스 올린 곳까지 색칠
const handleStarHover = (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('rate-star-img')) {
    const hoverScore = Number(target.dataset.score);
    modalView.updateStarsUI(hoverScore);
  }
};

const handleStarLeave = (e: Event) => {
  const target = e.target as HTMLElement;
  const relatedTarget = (e as MouseEvent).relatedTarget as HTMLElement | null;

  if (target.closest('.star-rating') && !relatedTarget?.closest('.star-rating')) {
    modalView.updateStarsUI(modalState.savedRating); // 마우스를 빼면 기존 점수로 복구
  }
};

const handleStarClick = async (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('rate-star-img')) {
    const clickedScore = Number(target.dataset.score);

    modalState.savedRating = clickedScore; // 기존 점수를 클릭한 점수로 업데이트
    modalView.updateStarsUI(clickedScore); // 클릭한 점수로 점수 변경

    await modalState.storage?.saveRating(modalState.movieId, clickedScore); // 변경된 점수를 저장
  }
};

// 모달 이벤트 총괄
const initModalEvents = () => {
  const $closeModalButton = document.querySelector('#closeModal');
  const $modalBackground = document.querySelector('#modalBackground');
  const $modalContainer = document.querySelector('#modalContainer');

  // 닫기 관련 이벤트
  $closeModalButton?.addEventListener('click', handleCloseModal);
  $modalBackground?.addEventListener('click', handleBackgroundClick);
  document.addEventListener('keydown', handleEscapeKey);

  // 별점 관련 이벤트
  $modalContainer?.addEventListener('mouseover', handleStarHover);
  $modalContainer?.addEventListener('mouseout', handleStarLeave);
  $modalContainer?.addEventListener('click', handleStarClick);

  // 모달 다시시도 이벤트
  $modalContainer?.addEventListener('click', handleRetryButton);
};

// 닫기 버튼 클릭할 때
const handleCloseModal = () => modalView.closeModalUI();

// 모달 창 바깥 배경 클릭하면
const handleBackgroundClick = (e: Event) => {
  if (e.target === document.querySelector('#modalBackground')) {
    modalView.closeModalUI();
  }
};

// ESC 키 눌렀을 때
const handleEscapeKey = (e: KeyboardEvent) => {
  const isModalActive = document.querySelector('#modalBackground')?.classList.contains('active');
  if (e.key === 'Escape' && isModalActive) {
    modalView.closeModalUI();
  }
};

// 오류상황에 모달 다시시도 버튼 눌렀을 때
const handleRetryButton = (e: Event) => {
  const target = e.target as HTMLElement;
  const retryButton = target.closest('#retryModalButton') as HTMLElement | null;
  if (retryButton) {
    const movieId = Number(retryButton.dataset.id);
    if (movieId) {
      openModal(movieId);
    }
  }
}

initModalEvents();
