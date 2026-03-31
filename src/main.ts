import { getPopularMovies } from "./api.ts";
import type { Movie } from "./api.ts";
import Component from "./component.ts";

let nextPageNum = 0;
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
        if (ul) {
          clearSkeleton(ul);
          renderMovies(ul, movies);
        }
        loadMoreButton?.addEventListener("click", loadMoreMovies);
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

addEventListener("load", loadInitialMovie);

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

function renderMovies(ul: Element, movies: Movie[]) {
  movies.forEach((movie) => addMovies(ul, movie));
}

function addMovies(parent: Element, movie: Movie) {
  parent.innerHTML += Component.movie(movie);
}
