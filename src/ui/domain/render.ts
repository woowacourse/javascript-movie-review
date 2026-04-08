import type { Movie } from "../../api.ts";
import Component from "../utils/component.ts";

const Renderer = {
  renderSectionHeading() {
    //TODO: 계층 분리하기
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.textContent = `지금 인기 있는 영화`;
    }
  },

  renderSearchSectionHeading(title: string) {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.textContent = `"${title}"검색 결과`;
      heading.style.marginTop = "12rem";
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

  renderSkeleton(parent: Element, length: number) {
    parent.innerHTML += Array.from({ length: length })
      .map(() => Component.movieSkeleton())
      .join("");
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

export default Renderer;
