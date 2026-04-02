import type { Movie } from "./api.ts";
import Component from "./component.ts";

const Renderer = {
  renderSearchSectionHeading(title: string) {
    const heading = document.querySelector("section > h2");
    if (heading instanceof HTMLElement) {
      heading.innerHTML = `"${title}"검색 결과`;
      heading.style.marginTop = "12rem";
    }
  },

  renderSearchMovies(movies: Movie[]) {
    const ul = document.querySelector(".thumbnail-list");
    if (ul) {
      this.renderMovies(ul, movies);
    }
  },

  clearMovies() {
    const ul = document.querySelector(".thumbnail-list");
    if (ul) ul.innerHTML = "";
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

  renderSkeleton(ul: Element, length: number) {
    ul.innerHTML += Array.from({ length: length })
      .map(() => Component.movieSkeleton())
      .join("");
  },

  renderMovies(ul: Element, movies: Movie[]) {
    const movieListComponent = movies
      .map((movie) => Component.movie(movie))
      .join("");
    ul.innerHTML += movieListComponent;
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
};

export default Renderer;
