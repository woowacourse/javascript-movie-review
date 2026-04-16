import { Movie, MovieDetail } from "../../apis/dtos.ts";
import MovieCardComponent from "../components/movieCard.ts";
import MovieBannerComponent from "../components/movieBanner.ts";
import NoticeComponent from "../components/notice.ts";
import ModalComponent from "../components/modal.ts";
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
    parent.innerHTML = MovieBannerComponent.movieBanner({
      title,
      voteAverage,
      posterPath,
    });
  },

  renderEmptyResult() {
    const section = getSectionElement();
    const node = document.createElement("div");
    node.innerHTML = NoticeComponent.emptyResult();
    section?.appendChild(node);
  },

  renderError(parent: Element, message: string) {
    parent.innerHTML = NoticeComponent.error(message);
  },

  renderSkeleton(parent: Element, length: number) {
    appendHTML(
      parent,
      Array.from({ length: length })
        .map(() => MovieCardComponent.movieSkeleton())
        .join(""),
    );
  },

  renderMovies(parent: Element, movies: Movie[]) {
    const movieListComponent = movies
      .map((movie) => MovieCardComponent.movie(movie))
      .join("");
    appendHTML(parent, movieListComponent);
  },

  clearSkeleton(parent: Element) {
    const targetClassName = "skeleton";
    filterHTML(parent, targetClassName);
  },

  renderInView(parent: Element) {
    appendHTML(parent, NoticeComponent.inView());
  },

  renderMovieModalSkeleton(parent: Element) {
    appendHTML(parent, ModalComponent.movieModalSkeleton());
  },

  renderMovieModal(parent: Element, movie: MovieDetail, rating?: number) {
    appendHTML(parent, ModalComponent.movieModal(movie, rating || 0));
  },

  renderMovieModalError(parent: Element) {
    appendHTML(parent, ModalComponent.movieModalError());
  },

  clearElement(parent: Element) {
    clearHTML(parent);
  },

  removeElement(element: Element) {
    removeElementUtil(element);
  },
};

export default Renderer;
