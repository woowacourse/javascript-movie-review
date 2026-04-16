import {
  controlInitialMovies,
  controlSearchSubmit,
  controlScroll,
  controlModal,
  controlModalClose,
  setMovieRating,
} from "./features/handler/controllerHandlers";

const backgroundContainer = document.querySelector(
  ".background-container",
) as HTMLElement;
const movieCard = document.querySelector(".thumbnail-list") as HTMLUListElement;
const modalContainer = document.querySelector(
  ".container",
) as HTMLButtonElement;

addEventListener("load", async () => {
  await controlInitialMovies();
});

// 검색
backgroundContainer.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();

  const searchInput = document.querySelector(
    ".search-input",
  ) as HTMLInputElement;
  await controlSearchSubmit(searchInput.value.trim());
});

// 로고 클릭
backgroundContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const logo = target.closest(".logo");

  if (!logo) {
    return;
  }

  await controlInitialMovies();
});

// 무한 스크롤
window.addEventListener("scroll", async () => {
  await controlScroll(
    window.innerHeight,
    window.scrollY,
    document.body.scrollHeight,
  );
});

// 영화 클릭
movieCard.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const card = target.closest(".item") as HTMLElement;

  if (!card) {
    return;
  }

  await controlModal(Number(card.dataset.id));
});

// 모달 닫기
modalContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const modalBackground = target.closest(".modal-background") as HTMLElement;
  const modalClose = target.closest(".close-modal") as HTMLElement;

  if (!modalClose) {
    return;
  }

  controlModalClose(modalBackground);
});

// ESC
document.addEventListener("keydown", async (e: KeyboardEvent) => {
  if (e.key !== "Escape") {
    return;
  }

  const modalBackground = document.querySelector(
    ".modal-background.active",
  ) as HTMLElement;

  controlModalClose(modalBackground);
});

// 별점 클릭
modalContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const modal = target.closest(".modal") as HTMLElement;

  if (!modal) {
    return;
  }

  const star = target.closest(".star") as HTMLImageElement;

  if (!star) {
    return;
  }

  setMovieRating(Number(modal.dataset.id), Number(star.dataset.id));
});

// 자세히 보기
backgroundContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const detailButton = target.closest(".primary") as HTMLElement;

  if (!detailButton) {
    return;
  }

  await controlModal(Number(detailButton.dataset.id));
});
