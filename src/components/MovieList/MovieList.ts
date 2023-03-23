import { fetchMovieListWithKeyword, fetchPopularMovieList } from "../../apis/apis";
import Movie, { IMovie } from "../../domain/Movie";
import "./style.css";
import MovieItem from "./MovieItem/MovieItem";
import SkeletonList from "./SkeletonList/SkeletonContainer";
import { IMoviesResponseData } from "../../types/IMovieResponseData";
import throttle from "../../utils/throttle";
import Modal from "../Modal/Modal";

interface IMovieListProps {
  type: string;
  searchKeyword: string;
  modal: Modal;
}

class MovieList {
  $target: HTMLElement;
  #props: IMovieListProps;
  #page: number;
  #observer: IntersectionObserver | null;

  constructor($target: HTMLElement, props: IMovieListProps) {
    this.$target = $target;
    this.#props = props;
    this.#page = 1;
    this.#observer = null;

    this.render();
    this.setEvent();
  }

  template() {
    return `
        <section class="item-view">
          <h2 class="search-title"></h2>
          <ul class="item-list"></ul>
          <ul class="skeleton-container"></ul>
        </section>
      `;
  }

  render() {
    this.$target.innerHTML = this.template();

    const $skeletonContainer = this.$target.querySelector(".skeleton-container");

    if ($skeletonContainer instanceof HTMLUListElement) {
      new SkeletonList($skeletonContainer);

      this.renderTitle();
      this.renderMovieList();
      this.setupIntersectionObserver();
    }
  }

  renderTitle(title?: string) {
    const { type, searchKeyword } = this.#props;
    const $titleForMovieContents = this.$target.querySelector(".search-title");

    if ($titleForMovieContents) {
      $titleForMovieContents.textContent =
        title || (type === "popular" ? "지금 인기있는 영화" : `"${searchKeyword}" 검색결과`);
    }
  }

  async renderMovieList() {
    const $itemList = this.$target.querySelector(".item-list");

    this.toggleSkeletonContainerVisibility();
    const fetchedMovieData = await this.fetchMovieList();
    this.toggleSkeletonContainerVisibility();

    if (!($itemList instanceof HTMLUListElement) || !fetchedMovieData) return;

    if (!this.isExistMovie(fetchedMovieData)) {
      const { searchKeyword } = this.#props;
      this.renderTitle(`"${searchKeyword}"에 대한 검색 결과가 없습니다 :(`);
      return;
    }

    if (this.isLastPage(fetchedMovieData)) {
      this.disconnectObserver();
    }

    const movies = fetchedMovieData.results.map((movieData) => new Movie(movieData));
    movies.forEach((movie) => new MovieItem($itemList, movie));
    this.#page += 1;

    this.setupIntersectionObserver();
  }

  async fetchMovieList() {
    const { type, searchKeyword } = this.#props;
    try {
      if (type === "popular") {
        return await fetchPopularMovieList(this.#page);
      }
      if (type === "search") {
        return await fetchMovieListWithKeyword(this.#page, searchKeyword);
      }
    } catch (e) {
      this.renderTitle("영화 리스트를 불러오는데 실패 했습니다 :(");
    }
  }

  isExistMovie(movieData: IMoviesResponseData) {
    return !!movieData.results.length;
  }

  isLastPage(movieData: IMoviesResponseData) {
    return movieData.total_pages === this.#page;
  }

  toggleSkeletonContainerVisibility() {
    const $skeletonContainer = this.$target.querySelector(".skeleton-container");

    if ($skeletonContainer) {
      $skeletonContainer.classList.toggle("visible");
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const throttledRenderMovieList = throttle(this.renderMovieList.bind(this), 1000);

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          throttledRenderMovieList();
        }
      });
    };

    if (this.#observer) {
      this.#observer.disconnect();
    }

    this.#observer = new IntersectionObserver(handleIntersection, options);
    const $itemList = this.$target.querySelector(".item-list");

    if ($itemList instanceof HTMLUListElement) {
      const $lastItem = $itemList.lastElementChild;

      if ($lastItem) {
        this.#observer.observe($lastItem);
      }
    }
  }

  disconnectObserver() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
    }
  }

  setEvent() {
    this.$target.addEventListener("movieItemClick", (event) => {
      const { movie } = event.detail;
      this.#props.modal.updateContent(movie);
      this.#props.modal.show();
    });
  }
}

declare global {
  interface HTMLElementEventMap {
    movieItemClick: CustomEvent<{
      movie: IMovie;
    }>;
  }
}
export default MovieList;
