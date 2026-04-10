import { Movie, MovieDetail } from "../../apis/dtos.ts";
import Component from "../component.ts";
import { appendHTML, filterHTML } from "../utils/inner.ts";
import { getSectionElement, getSectionHeadingElement } from "./movieElement";

const Renderer = {
  // TODO: 같은 계층을 사용하고, 바로 하위가 아닌 더 하위의 계층을 사용하는 부분 수정 필요
  renderSectionHeading() {
    const heading = getSectionHeadingElement();
    if (heading) {
      heading.textContent = `지금 인기 있는 영화`;
      heading.classList.remove("search-mode");
    }
  },

  // TODO: 같은 계층을 사용하고, 바로 하위가 아닌 더 하위의 계층을 사용하는 부분 수정 필요
  renderSearchSectionHeading(title: string) {
    const heading = getSectionHeadingElement();
    if (heading) {
      heading.textContent = `"${title}"검색 결과`;
      heading.classList.add("search-mode");
    }
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

  renderMovieModal(parent: Element, movie: MovieDetail) {
    appendHTML(parent, Component.movieModal(movie));
  },

  renderMovieModalError(parent: Element) {
    appendHTML(parent, Component.movieModalError());
  },
};

export default Renderer;
