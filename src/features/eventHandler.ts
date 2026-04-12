import { movieState } from "./movieState";
import {
  initialRender,
  renderMoreMovies,
  renderSearchResults,
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
      movieState.reset();
      await initialRender(movieState.page);
    }
  });
}

function loadSearch() {
  const submitContainer = document.querySelector(
    ".background-container",
  ) as HTMLFormElement;
  submitContainer.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();
    movieState.page = 1;
    movieState.searchQuery = Header.getSearchInputValue();

    if (movieState.searchQuery === "") {
      await initialRender(movieState.page);
      return;
    }

    await renderSearchResults(movieState.page, movieState.searchQuery);
  });
}

function loadInfiniteScroll() {
  const sentinel = document.querySelector(".scroll-sentinel") as HTMLElement;
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !movieState.isLoading && movieState.hasMore) {
        movieState.page += 1;
        renderMoreMovies(movieState.page, movieState.searchQuery);
      }

      // 마지막 페이지면 관찰 중단
      if (!movieState.hasMore) observer.disconnect();
    },
    { rootMargin: "200px" },
  );

  observer.observe(sentinel);
}

// 하나의 영화 카드를 클릭했을 때, 해당 카드에서 영화의 id를 받아서
// 그 id를 그 영화 정보를 렌더링 하는 함수로 넘겨준다. -> 렌더링 한다.
function loadMovieDetailInfo() {
  const movieList = document.querySelector(".thumbnail-list") as HTMLElement;
  if (movieList) {
    movieList.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement; // 클릭된 요소
      const card = target.closest(".movie-card") as HTMLElement; // 카드 찾기
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
