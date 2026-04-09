import { Movie } from "../../apis/dtos.ts";
import Component from "../utils/component.ts";
import {
  getBannerElement,
  getEmptyResultElement,
  getMovieListElement,
  getSectionElement,
  getSectionHeadingElement,
} from "./movieElement";

const Renderer = {
  renderSectionHeading() {
    const heading = getSectionHeadingElement();
    if (heading) {
      heading.textContent = `지금 인기 있는 영화`;
      heading.classList.remove("search-mode");
    }
  },

  renderSearchSectionHeading(title: string) {
    const heading = getSectionHeadingElement();
    if (heading) {
      heading.textContent = `"${title}"검색 결과`;
      heading.classList.add("search-mode");
    }
  },

  clearMovies() {
    const movieList = getMovieListElement();
    if (movieList) movieList.innerHTML = "";
  },

  renderBanner(parent: Element, { title, voteAverage, posterPath }: Movie) {
    parent.innerHTML = Component.movieBanner({
      title,
      voteAverage,
      posterPath,
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

  renderInView(parent: Element) {
    parent.innerHTML += Component.inView();
  },
};

export default Renderer;
