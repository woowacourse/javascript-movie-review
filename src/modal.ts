import { fetchMovieDetail } from './api.ts';
import { reviewStorage } from './reviewStorage.ts';
import * as modalView from './modalView.ts';

const modalState = {
  movieId: 0,
  savedRating: 0,
};

// 모달 열기
export const openModal = async (movieId: number) => {
  modalView.openModalUI();
  modalView.showModalSkeleton();

  try {
    const data = await fetchMovieDetail(movieId);
    // 스토리지에서 내 별점 가져오기

    modalState.movieId = movieId;
    modalState.savedRating = (await reviewStorage.getRating(movieId)) || 0;

    modalView.renderModalContent(data, modalState.savedRating);
  } catch (error) {
    modalView.showError();
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
  if (target.closest('.star-rating') && !(e as MouseEvent).relatedTarget?.closest?.('.star-rating')) {
    modalView.updateStarsUI(modalState.savedRating); // 마우스를 빼면 기존 점수로 복구
  }
};

const handleStarClick = async (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('rate-star-img')) {
    const clickedScore = Number(target.dataset.score);
    
    modalState.savedRating = clickedScore; // 기존 점수를 클릭한 점수로 업데이트
    modalView.updateStarsUI(clickedScore); // 클릭한 점수로 점수 변경

    await reviewStorage.saveRating(modalState.movieId, clickedScore); // 변경된 점수를 저장
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

initModalEvents();
