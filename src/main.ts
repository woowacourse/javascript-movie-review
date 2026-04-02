import { getPopularMovies, getSearchMovies } from "./api.ts";
import Renderer from "./render.ts";

let nextPageNum = 0;
let nextSearchPageNum = 0;
let requestMovieCount = 0;

async function loadInitialMovie() {
  const app = document.querySelector("#app");
  if (app) {
    await getPopularMovies({
      pageNum: 1,
      onSuccess: ({ page, results: movies }) => {
        nextPageNum = page + 1;
        requestMovieCount = movies.length;
        const ul = document.querySelector(".thumbnail-list");
        const loadMoreButton = document.querySelector(".load-more-button");
        const banner = document.querySelector(".banner-container");

        if (banner) {
          Renderer.renderBanner(banner, movies[0]);
          observeHeaderScroll();
        }
        if (ul) {
          Renderer.clearSkeleton(ul);
          Renderer.renderMovies(ul, movies);
        }
        if (loadMoreButton)
          loadMoreButton.addEventListener("click", loadMoreMovies);
      },
      onLoading: () => {
        // 로딩 중일 때 ui 보여주기
        const ul = document.querySelector(".thumbnail-list");
        if (ul) Renderer.renderSkeleton(ul, requestMovieCount || 20);
      },
      onError: (_) => {
        const main = document.querySelector("main");
        if (main)
          Renderer.renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
      },
    });
  }
}

async function loadMoreMovies() {
  await getPopularMovies({
    pageNum: nextPageNum,
    onSuccess: ({ page, results: movies }) => {
      const ul = document.querySelector(".thumbnail-list");
      const haveRestPage = movies.length === 20;
      nextPageNum = page + 1;
      if (haveRestPage) showLoadMoreButton();
      if (ul) {
        Renderer.clearSkeleton(ul);
        Renderer.renderMovies(ul, movies);
      }
    },
    onError: function (_): void {
      throw new Error("Function not implemented.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) Renderer.renderSkeleton(ul, requestMovieCount);
      hideLoadMoreButton();
    },
  });
}

async function loadMoreSearchMovies(query: string) {
  await getSearchMovies({
    query,
    pageNum: nextSearchPageNum,
    onSuccess: ({ page, results: movies }) => {
      const ul = document.querySelector(".thumbnail-list");
      nextSearchPageNum = page + 1;
      if (ul) {
        Renderer.clearSkeleton(ul);
        Renderer.renderSearchMovies(movies);
      }
    },
    onError: function (_): void {
      const main = document.querySelector("main");
      if (main)
        Renderer.renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) Renderer.renderSkeleton(ul, requestMovieCount);
    },
  });
}

async function loadSearchMovies(query: string) {
  await getSearchMovies({
    query,
    pageNum: 1,
    onSuccess: ({ page, results: movies }) => {
      const loadMoreButton = document.querySelector(".load-more-button");
      const haveRestPage = movies.length === 20;
      if (loadMoreButton) {
        loadMoreButton?.removeEventListener("click", loadMoreMovies);
        loadMoreButton.addEventListener("click", () =>
          loadMoreSearchMovies(query),
        );
      }
      nextSearchPageNum = page + 1;
      Renderer.clearBanner();
      Renderer.clearMovies();
      Renderer.clearEmptyResult();
      Renderer.renderSearchSectionHeading(query);
      if (haveRestPage) showLoadMoreButton();
      if (movies.length === 0) Renderer.renderEmptyResult();
      else Renderer.renderSearchMovies(movies);
    },
    onError: function (_): void {
      const main = document.querySelector("main");
      if (main)
        Renderer.renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) Renderer.renderSkeleton(ul, requestMovieCount);
      hideLoadMoreButton();
    },
  });
}

const searchForm = document.querySelector(".search-form");
searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = searchForm.querySelector("input");
  if (input) {
    const searchValue = input.value;
    loadSearchMovies(searchValue);
  }
});

addEventListener("load", loadInitialMovie);

function observeHeaderScroll() {
  // 배너영역을 기준으로 헤더의 background 색상이 변경된다.
  const topRatedMovie = document.querySelector(".top-rated-movie");
  const header = document.querySelector(".background-container");
  if (topRatedMovie && header) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        header.classList.toggle("scrolled", !entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(topRatedMovie);
  }
}

function showLoadMoreButton() {
  const button = document.querySelector(".load-more-button");
  if (button instanceof HTMLElement) button.style.display = "block";
}

function hideLoadMoreButton() {
  const button = document.querySelector(".load-more-button");
  if (button instanceof HTMLElement) button.style.display = "none";
}
