import {
  initialRender,
  searchMovies,
  loadMore,
  renderMovieDetailModal,
  closeMovieDetailModal,
} from "./movieController";
import { Header } from "./View/Header";

export function initEvents() {
  loadHeader();
  loadSearch();
  loadInfiniteScroll();
  loadMovieDetailInfo();
}

function loadHeader() {
  const header = document.querySelector(".header") as HTMLElement;

  header.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".logo")) {
      await initialRender();
    }
  });
}

function loadSearch() {
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;
  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    const query = Header.getSearchInputValue();
    await searchMovies(query);
  });
}

function loadInfiniteScroll() {
  const sentinel = document.querySelector(".scroll-sentinel") as HTMLElement;
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    { rootMargin: "200px" },
  );

  observer.observe(sentinel);
}

function loadMovieDetailInfo() {
  const movieList = document.querySelector(".thumbnail-list") as HTMLElement;
  if (movieList) {
    movieList.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;
      const card = target.closest(".movie-card") as HTMLElement;
      if (card) {
        const id = card.dataset.id;
        if (id) await renderMovieDetailModal(Number(id));
      }
    });
  }

  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (
      target.closest(".close-modal") ||
      target.classList.contains("modal-background")
    ) {
      closeMovieDetailModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMovieDetailModal();
    }
  });
}
