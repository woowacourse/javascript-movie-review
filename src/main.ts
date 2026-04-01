import { getPopularMovies, getSearchMovies } from "./api.ts";
import type { Movie } from "./api.ts";
import Component from "./component.ts";

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
          renderBanner(banner, movies[0]);
          observeHeaderScroll();
        }
        if (ul) {
          clearSkeleton(ul);
          renderMovies(ul, movies);
        }
        if (loadMoreButton)
          loadMoreButton.addEventListener("click", loadMoreMovies);
      },
      onLoading: () => {
        // 로딩 중일 때 ui 보여주기
        const ul = document.querySelector(".thumbnail-list");
        if (ul) renderSkeleton(ul, requestMovieCount);
      },
      onError: (_) => {
        const main = document.querySelector("main");
        if (main) renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
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
        clearSkeleton(ul);
        renderMovies(ul, movies);
      }
    },
    onError: function (_): void {
      throw new Error("Function not implemented.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) renderSkeleton(ul, requestMovieCount);
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
        clearSkeleton(ul);
        renderSearchMovies(movies);
      }
    },
    onError: function (_): void {
      const main = document.querySelector("main");
      if (main) renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) renderSkeleton(ul, requestMovieCount);
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
      clearBanner();
      clearMovies();
      clearEmptyResult();
      renderSearchSectionHeading(query);
      if (haveRestPage) showLoadMoreButton();
      if (movies.length === 0) renderEmptyResult();
      else renderSearchMovies(movies);
    },
    onError: function (_): void {
      const main = document.querySelector("main");
      if (main) renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) renderSkeleton(ul, requestMovieCount);
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

function renderSkeleton(ul: Element, length: number) {
  ul.innerHTML += Array.from({ length: length })
    .map(() => addSkeletonMovies())
    .join("");
}

function addSkeletonMovies() {
  return Component.movieSkeleton();
}

function clearSkeleton(parent: Element) {
  parent.innerHTML = [...parent.children]
    .filter((child) => {
      if (
        child instanceof HTMLElement &&
        child.classList.contains("skeleton")
      ) {
        return false;
      }
      return true;
    })
    .map((child) => child.outerHTML)
    .join("");
}

function renderSearchSectionHeading(title: string) {
  const heading = document.querySelector("section > h2");
  if (heading) heading.innerHTML = `"${title}"검색 결과`;
}

function renderSearchMovies(movies: Movie[]) {
  const ul = document.querySelector(".thumbnail-list");
  if (ul) {
    renderMovies(ul, movies);
  }
}

function clearMovies() {
  const ul = document.querySelector(".thumbnail-list");
  if (ul) ul.innerHTML = "";
}

function clearBanner() {
  const banner = document.querySelector(".banner-container");
  if (banner) banner.innerHTML = "";
}

function clearEmptyResult() {
  const emptyResult = document.querySelector(".empty-result");
  emptyResult?.remove();
}

function showLoadMoreButton() {
  const button = document.querySelector(".load-more-button");
  if (button instanceof HTMLElement) button.style.display = "block";
}

function hideLoadMoreButton() {
  const button = document.querySelector(".load-more-button");
  if (button instanceof HTMLElement) button.style.display = "none";
}

function renderMovies(ul: Element, movies: Movie[]) {
  movies.forEach((movie) => addMovies(ul, movie));
}

function addMovies(parent: Element, movie: Movie) {
  parent.innerHTML += Component.movie(movie);
}

function renderBanner(
  parent: Element,
  { title, vote_average, poster_path }: Movie,
) {
  parent.innerHTML = Component.movieBanner({
    title,
    vote_average,
    poster_path,
  });
}

function renderEmptyResult() {
  const section = document.querySelector("section");
  const node = document.createElement("div");
  node.innerHTML = Component.emptyResult();
  section?.appendChild(node);
}

function renderError(parent: Element, message: string) {
  parent.innerHTML = Component.error(message);
}
