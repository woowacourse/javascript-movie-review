import { Movie, MovieDetail } from "../../apis/dtos.ts";
import Component from "../component.ts";
import {
  appendHTML,
  clearHTML,
  filterHTML,
  removeElement as removeElementUtil,
} from "../utils/inner.ts";
import { getSectionElement } from "./movieElement";

const Renderer = {
  renderSectionHeading(element: Element) {
    element.textContent = `지금 인기 있는 영화`;
    element.classList.remove("search-mode");
  },

  renderSearchSectionHeading(element: Element, title: string) {
    element.textContent = `"${title}"검색 결과`;
    element.classList.add("search-mode");
  },

  renderBanner(parent: Element, { title, voteAverage, posterPath }: Movie) {
    parent.innerHTML = Component.movieBanner({
      title,
      voteAverage,
      posterPath,
    });
  },

  renderEmptyResult() {
    const section = getSectionElement();
    const node = document.createElement("div");
    node.innerHTML = Component.emptyResult();
    section?.appendChild(node);
  },

  renderError(parent: Element, message: string) {
    parent.innerHTML = Component.error(message);
  },

  renderSkeleton(parent: Element, length: number) {
    appendHTML(
      parent,
      Array.from({ length: length })
        .map(() => Component.movieSkeleton())
        .join(""),
    );
  },

  renderMovies(parent: Element, movies: Movie[]) {
    const movieListComponent = movies
      .map((movie) => Component.movie(movie))
      .join("");
    appendHTML(parent, movieListComponent);
  },

  clearSkeleton(parent: Element) {
    const targetClassName = "skeleton";
    filterHTML(parent, targetClassName);
  },

  renderInView(parent: Element) {
    appendHTML(parent, Component.inView());
  },

  renderMovieModalSkeleton(parent: Element) {
    appendHTML(parent, Component.movieModalSkeleton());
  },

  renderMovieModal(parent: Element, movie: MovieDetail, rating?: number) {
    appendHTML(parent, Component.movieModal(movie, rating || 0));
  },

  renderMovieModalError(parent: Element) {
    appendHTML(parent, Component.movieModalError());
  },

  clearElement(parent: Element) {
    clearHTML(parent);
  },

  removeElement(element: Element) {
    removeElementUtil(element);
  },
};

export default Renderer;
