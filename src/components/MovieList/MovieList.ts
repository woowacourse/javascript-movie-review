import { fetchMovieListWithKeyword, fetchPopularMovieList } from "../../apis/apis";
import Movie from "../../domain/Movie";
import "./style.css";
import MovieItem from "./MovieItem/MovieItem";
import SkeletonList from "./SkeletonList/SkeletonContainer";
import { IMoviesResponseData } from "../../types/IMovieResponseData";

interface IMovieListProps {
  type: string;
  searchKeyword: string;
}

class MovieList {
  $target: HTMLElement;
  #props: IMovieListProps;
  #page: number;

  constructor($target: HTMLElement, props: IMovieListProps) {
    this.$target = $target;
    this.#props = props;
    this.#page = 1;

    this.render();
    this.setEvent();
  }

  template() {
    return `
        <section class="item-view">
          <h2 class="search-title"></h2>
          <ul class="item-list"></ul>
          <ul class="skeleton-container"></ul>
          <button class="more btn primary full-width">더 보기</button>
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
    }
  }

  renderTitle(title?: string) {
    const { type, searchKeyword } = this.#props;
    const $titleForMovieContents = this.$target.querySelector(".search-title");

    if ($titleForMovieContents instanceof HTMLHeadElement) {
      const text =
        title || (type === "popular" ? "지금 인기있는 영화" : `"${searchKeyword}" 검색결과`);

      $titleForMovieContents.innerText = text;
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
    if (this.isLastPage(fetchedMovieData)) this.toggleMoreButton();

    const movies = fetchedMovieData.results.map((movieData) => new Movie(movieData));
    movies.forEach((movie) => new MovieItem($itemList, movie));
    this.#page += 1;
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
      this.toggleMoreButton();
    }
  }

  isExistMovie(movieData: IMoviesResponseData) {
    return !!movieData.results.length;
  }

  isLastPage(movieData: IMoviesResponseData) {
    return movieData.total_pages === this.#page;
  }

  toggleMoreButton() {
    const $loadMoreButton = this.$target.querySelector(".more");

    if ($loadMoreButton) {
      $loadMoreButton.classList.toggle("invisible");
    }
  }

  toggleSkeletonContainerVisibility() {
    const $skeletonContainer = this.$target.querySelector(".skeleton-container");

    if ($skeletonContainer) {
      $skeletonContainer.classList.toggle("visible");
    }
  }

  setEvent() {
    const $moreButton = this.$target.querySelector(".more");

    if ($moreButton) {
      $moreButton.addEventListener("click", () => {
        this.renderMovieList();
      });
    }
  }
}

export default MovieList;
