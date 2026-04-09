import type { Movie } from "./api.ts";
import Component from "./component.ts";
import { ONCE_MOVIE_LIMIT } from "./constans/movie.ts";
import { observeHeaderScroll } from "./observer.ts";

export const MovieRenderer = {
  renderInitialMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    const banner = document.querySelector(".banner-container");
    if (banner) {
      Renderer.renderBanner(banner, movies[0]);
      observeHeaderScroll();
    }
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderMovies(movieList, movies);
    }
    Renderer.renderSectionHeading();
  },
  renderLoadMoreMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    const haveRestPage = movies.length === ONCE_MOVIE_LIMIT;
    if (haveRestPage) Renderer.showLoadMoreButton();
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderMovies(movieList, movies);
    }
  },
  renderSearchResult(movies: Movie[], query: string) {
    const haveRestPage = movies.length === ONCE_MOVIE_LIMIT;
    Renderer.clearBanner();
    Renderer.clearMovies();
    Renderer.clearEmptyResult();
    Renderer.renderSearchSectionHeading(query);
    if (haveRestPage) Renderer.showLoadMoreButton();
    if (movies.length === 0) Renderer.renderEmptyResult();
    else Renderer.renderSearchMovies(movies);
  },
  renderLoadMoreSearchMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    const haveRestPage = movies.length === ONCE_MOVIE_LIMIT;
    if (haveRestPage) Renderer.showLoadMoreButton();
    if (movieList) {
      Renderer.clearSkeleton(movieList);
      Renderer.renderSearchMovies(movies);
    }
  },

  renderError(err: unknown) {
    const message = err instanceof Error ? err.message : "에러가 발생했습니다.";
    const content = document.querySelector(".thumbnail-list");
    if (content) Renderer.renderError(content, message);
  },
};

export const Renderer = {
  renderSectionHeading() {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.innerHTML = `지금 인기 있는 영화`;
    }
  },

  renderSearchSectionHeading(title: string) {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.innerHTML = `"${title}"검색 결과`;
      heading.style.marginTop = "12rem";
    }
  },

  renderSearchMovies(movies: Movie[]) {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) {
      this.renderMovies(movieList, movies);
    }
  },

  clearMovies() {
    const movieList = document.querySelector(".thumbnail-list");
    if (movieList) movieList.innerHTML = "";
  },

  renderBanner(parent: Element, { title, vote_average, poster_path }: Movie) {
    parent.innerHTML = Component.movieBanner({
      title,
      vote_average,
      poster_path,
    });
  },

  clearBanner() {
    const banner = document.querySelector(".banner-container");
    if (banner) banner.innerHTML = "";
  },

  renderEmptyResult() {
    const section = document.querySelector("section");
    const node = document.createElement("div");
    node.innerHTML = Component.emptyResult();
    section?.appendChild(node);
  },

  clearEmptyResult() {
    const emptyResult = document.querySelector(".empty-result");
    emptyResult?.remove();
  },

  renderError(parent: Element, message: string) {
    parent.innerHTML = Component.error(message);
  },

  renderSkeleton(selector: string, length: number) {
    const target = document.querySelector(selector);
    if (target instanceof HTMLElement) {
      target.innerHTML += Array.from({ length: length })
        .map(() => Component.movieSkeleton())
        .join("");
    }
  },

  renderMovies(parent: Element, movies: Movie[]) {
    const movieListComponent = movies
      .map((movie) => Component.movie(movie))
      .join("");
    parent.innerHTML += movieListComponent;
  },

  clearSkeleton(parent: Element) {
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
  },

  showLoadMoreButton() {
    const button = document.querySelector(".load-more-button");
    if (button instanceof HTMLElement) button.style.display = "block";
  },

  hideLoadMoreButton() {
    const button = document.querySelector(".load-more-button");
    if (button instanceof HTMLElement) button.style.display = "none";
  },
};
