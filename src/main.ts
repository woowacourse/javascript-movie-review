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

        if (banner) renderBanner(banner, movies[0]);
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
      onError: (error) => {
        // 에러 ui 보여주기
        console.error(error);
      },
    });
  }
}

async function loadMoreMovies() {
  await getPopularMovies({
    pageNum: nextPageNum,
    onSuccess: ({ page, results: movies }) => {
      const ul = document.querySelector(".thumbnail-list");
      nextPageNum = page + 1;
      if (ul) {
        clearSkeleton(ul);
        renderMovies(ul, movies);
      }
    },
    onError: function (error: Error): void {
      throw new Error("Function not implemented.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) renderSkeleton(ul, requestMovieCount);
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
    onError: function (error: Error): void {
      throw new Error("Function not implemented.");
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
      if (loadMoreButton) {
        loadMoreButton?.removeEventListener("click", loadMoreMovies);
        loadMoreButton.addEventListener("click", () =>
          loadMoreSearchMovies(query),
        );
      }

      nextSearchPageNum = page + 1;
      clearBanner();
      clearMovies();
      renderSearchSectionHeading(query);
      renderSearchMovies(movies);
    },
    onError: function (error: Error): void {
      throw new Error("Function not implemented.");
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) renderSkeleton(ul, requestMovieCount);
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

const banner = document.querySelector(".top-rated-movie");
const header = document.querySelector(".background-container");

if (banner && header) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle("scrolled", !entry.isIntersecting);
    },
    { threshold: 0 },
  );
  observer.observe(banner);
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
