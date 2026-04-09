import {
  controlInitialMovies,
  controlMoreMovies,
  controlSearchMovies,
  controlModal,
} from "./features/handler/controllerHandlers";

let page: number = 1;
let searchMovie: string = "";

const backgroundContainer = document.querySelector(
  ".background-container",
) as HTMLElement;
const movieCard = document.querySelector(".thumbnail-list") as HTMLUListElement;
const modalContainer = document.querySelector(
  ".container",
) as HTMLButtonElement;

addEventListener("load", async () => {
  // 초기 렌더링
  await controlInitialMovies(page);
});

// 검색
backgroundContainer.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  page = 1;

  const searchInput = document.querySelector(
    ".search-input",
  ) as HTMLInputElement;
  searchMovie = searchInput.value.trim();

  // 검색어가 없는 경우 초기 렌더링
  if (searchMovie === "") {
    await controlInitialMovies(page);
    return;
  }

  // 검색어가 있는 경우 검색 결과 렌더링
  await controlSearchMovies(page, searchMovie);
});

// 로고 클릭
backgroundContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const logo = target.closest(".logo");

  if (!logo) {
    return;
  }

  page = 1;
  searchMovie = "";
  await controlInitialMovies(page);
});

// 무한 스크롤
window.addEventListener("scroll", async () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
    page += 1;
    await controlMoreMovies(page, searchMovie);
  }
});

// 영화 클릭
movieCard.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const card = target.closest(".item") as HTMLElement;

  if (!card) {
    return;
  }

  const movieId = Number(card.dataset.id);

  if (!movieId) {
    return;
  }

  await controlModal(movieId);
});

modalContainer.addEventListener("click", async (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const modalBackground = target.closest(".modal-background") as HTMLElement;
  const modalClose = target.closest(".close-modal") as HTMLElement;

  if (!modalClose) {
    return;
  }

  modalBackground.classList.remove("active");
});

document.addEventListener("keydown", async (e: KeyboardEvent) => {
  if (e.key !== "Escape") {
    return;
  }

  const modalBackground = document.querySelector(
    ".modal-background.active",
  ) as HTMLElement;

  if (!modalBackground) {
    return;
  }

  modalBackground.classList.remove("active");
});
