import { getPopularMovies } from "./api.ts";
import type { Movie } from "./api.ts";
import Component from "./component.ts";

let nextPageNum = 0;

async function loadInitialMovie() {
  const app = document.querySelector("#app");
  if (app) {
    await getPopularMovies({
      pageNum: 1,
      onSuccess: ({ page, results: movies }) => {
        nextPageNum = page + 1;
        const ul = document.querySelector(".thumbnail-list");
        const loadMoreButton = document.querySelector(".load-more-button");
        if (ul) renderMovies(ul, movies);
        loadMoreButton?.addEventListener("click", loadMoreMovies);
      },
      onLoading: () => {
        // 로딩 중일 때 ui 보여주기
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
      if (ul) renderMovies(ul, movies);
    },
    onError: function (error: Error): void {
      throw new Error("Function not implemented.");
    },
    onLoading: function (): void {
      throw new Error("Function not implemented.");
    },
  });
}

addEventListener("load", loadInitialMovie);

function renderMovies(ul: Element, movies: Movie[]) {
  movies.forEach((movie) => addMovies(ul, movie));
}

function addMovies(parent: Element, movie: Movie) {
  parent.innerHTML += Component.movie(movie);
}
