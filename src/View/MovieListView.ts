import { ThumbnailInfo } from "../../types/movie";

import { makeMovieThumbnail } from "../thumnailManager";
import { getElementOrThrow } from "./utils";

interface MovieListDomType {
  title: HTMLHeadingElement;
  container: HTMLElement;
  list: HTMLUListElement;
  notFound: HTMLDivElement;
}

class MovieListView {
  #dom: MovieListDomType;

  constructor() {
    this.#dom = {
      title: getElementOrThrow<HTMLHeadingElement>(".section-title"),
      container: getElementOrThrow<HTMLElement>(".section-container"),
      list: getElementOrThrow<HTMLUListElement>(".thumbnail-list"),
      notFound: getElementOrThrow<HTMLDivElement>(
        ".not-search-found-container",
      ),
    };
  }

  bindMovieItemClick(handler: (movieId: number) => void) {
    this.#dom.list.addEventListener("click", (e: MouseEvent) => {
      let item = (e.target as HTMLElement).closest(".thumbnail-container");

      if (!item) return;

      const movieId = item.getAttribute("data-movie-id");
      if (!movieId) {
        throw new Error("영화 id를 찾을 수 없습니다.");
      }

      handler(Number(movieId));
    });
  }

  addMovies(movieList: ThumbnailInfo[]) {
    const fragment = new DocumentFragment();

    movieList.forEach((movie) => {
      const thumbnail = makeMovieThumbnail(movie);
      fragment.appendChild(thumbnail);
    });

    this.#dom.list.appendChild(fragment);
  }

  remove() {
    this.#dom.list.replaceChildren();
  }

  addSkeletons() {
    const fragment = new DocumentFragment();
    const skeleton = document.createElement("div");
    skeleton.className = "movie-skeleton";

    for (let i = 0; i < 20; i++) {
      const newNode = skeleton.cloneNode(true);
      fragment.appendChild(newNode);
    }

    this.#dom.list.appendChild(fragment);
  }

  removeAllSkeletons() {
    // 나중에 querySelectorAll에 대한 비용도 생각해보자
    const skeletonNodes = document.querySelectorAll(".movie-skeleton");
    skeletonNodes.forEach((node) => node.remove());
  }

  renderTitle(title: string) {
    this.#dom.title.textContent = title;
  }

  addTopMargin() {
    this.#dom.container.classList.add("search-mode");
  }

  removeTopMargin() {
    this.#dom.container.classList.remove("search-mode");
  }

  showNotFound() {
    this.#dom.notFound.style.display = "flex";
  }

  hideNotFound() {
    this.#dom.notFound.style.display = "none";
  }
}

export default MovieListView;
