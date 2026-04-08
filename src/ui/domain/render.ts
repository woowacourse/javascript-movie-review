import type { Movie } from "../../types";
import {
  getBannerElement,
  getEmptyResultElement,
  getLoadMoreButtonElement,
  getMovieListElement,
  getSectionElement,
  getSectionHeadingElement,
} from "./movieElement";
import Component from "../utils/component.ts";

const Renderer = {
  renderSectionHeading() {
    const heading = getSectionHeadingElement();
    if (heading) {
      heading.textContent = `지금 인기 있는 영화`;
    }
  },

  renderSearchSectionHeading(title: string) {
    const heading = getSectionHeadingElement();
    if (heading) {
      heading.textContent = `"${title}"검색 결과`;
      heading.style.marginTop = "12rem";
    }
  },

  clearMovies() {
    const movieList = getMovieListElement();
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
    const banner = getBannerElement();
    if (banner) banner.innerHTML = "";
  },

  renderEmptyResult() {
    const section = getSectionElement();
    const node = document.createElement("div");
    node.innerHTML = Component.emptyResult();
    section?.appendChild(node);
  },

  clearEmptyResult() {
    const emptyResult = getEmptyResultElement();
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
    const button = getLoadMoreButtonElement();
    if (button) button.style.display = "block";
  },

  hideLoadMoreButton() {
    const button = getLoadMoreButtonElement();
    if (button) button.style.display = "none";
  },
};

export default Renderer;
