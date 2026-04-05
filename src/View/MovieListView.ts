import { ThumbnailInfo } from "../../types/movie";

import { makeMovieThumbnail } from "../thumnailManager";

interface MovieListDomType {
  title: HTMLHeadingElement | null;
  container: HTMLElement | null;
  list: HTMLUListElement | null;
  notFound: HTMLDivElement | null;
}

class MovieListView {
  #dom: MovieListDomType;

  constructor() {
    this.#dom = {
      title: document.querySelector(".section-title"),
      container: document.querySelector(".section-container"),
      list: document.querySelector(".thumbnail-list"),
      notFound: document.querySelector(".not-search-found-container"),
    };
  }

  addMovies(movieList: ThumbnailInfo[]) {
    const fragment = new DocumentFragment();

    movieList.forEach((movie) => {
      const thumbnail = makeMovieThumbnail(movie);
      fragment.appendChild(thumbnail);
    });

    this.#dom.list!.appendChild(fragment);
  }

  remove() {
    this.#dom.list!.replaceChildren();
  }

  addSkeletons() {
    const fragment = new DocumentFragment();
    const skeleton = document.createElement("div");
    skeleton.className = "movie-skeleton";

    for (let i = 0; i < 20; i++) {
      const newNode = skeleton.cloneNode(true);
      fragment.appendChild(newNode);
    }

    this.#dom.list!.appendChild(fragment);
  }

  removeAllSkeletons() {
    // 나중에 querySelectorAll에 대한 비용도 생각해보자
    const skeletonNodes = document.querySelectorAll(".movie-skeleton");
    skeletonNodes.forEach((node) => node.remove());
  }

  renderTitle(title: string) {
    this.#dom.title!.textContent = title;
  }

  showNotFound() {
    this.#dom.notFound!.style.display = "flex";
  }

  hideNotFound() {
    this.#dom.notFound!.style.display = "none";
  }
}

export default MovieListView;
