import { fetchMovieListWithKeyword, fetchPopularMovieList } from "../../apis";
import Movie from "../../domain/Movie";
import "./index.css";
import MovieItem from "./MovieItem";
import SkeletonList from "./SkeletonList";

class MovieList {
  $target;
  #props;
  #page;

  constructor($target, props) {
    this.$target = $target;
    this.#props = props;
    this.#page = 1;

    this.render();
    this.setEvent();
  }

  async renderMovieList() {
    const $itemList = this.$target.querySelector(".item-list");

    this.toggleSkeletonContainerVisibility();
    const fetchedMovieData = await this.fetchMovieList();
    console.log(fetchedMovieData);
    this.toggleSkeletonContainerVisibility();

    if (!this.isExistMovie(fetchedMovieData)) this.renderNotfoundMessage();
    if (this.isLastPage(fetchedMovieData)) this.toggleMoreButton();

    const movies = fetchedMovieData.results.map((movieData) => new Movie(movieData));
    movies.forEach((movie) => new MovieItem($itemList, movie));
    this.#page += 1;
  }

  template() {
    const { type, searchKeyword } = this.#props;

    const title = type === "popular" ? "지금 인기있는 영화" : `"${searchKeyword}" 검색결과`;

    return `
        <section class="item-view">
          <h2 class="search-title">${title}</h2>
          <ul class="item-list"></ul>
          <ul class="skeleton-container"></ul>
          <button class="more btn primary full-width">더 보기</button>
        </section>
      `;
  }

  mounted() {
    const $skeletonContainer = this.$target.querySelector(".skeleton-container");
    new SkeletonList($skeletonContainer);

    this.renderMovieList();
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {
    this.$target.querySelector(".more").addEventListener("click", () => {
      this.renderMovieList();
    });
  }

  toggleSkeletonContainerVisibility() {
    const $skeletonContainer = this.$target.querySelector(".skeleton-container");
    $skeletonContainer.classList.toggle("visible");
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
      const $searchTitle = this.$target.querySelector(".search-title");

      $searchTitle.innerText = `영화 리스트를 불러오는데 실패했습니다 :(`;
      this.toggleMoreButton();
    }
  }

  isExistMovie(movieData) {
    return !!movieData.results.length;
  }

  isLastPage(movieData) {
    return movieData.total_pages === this.#page;
  }

  renderNotfoundMessage() {
    const { searchKeyword } = this.#props;
    const $searchTitle = this.$target.querySelector(".search-title");

    $searchTitle.innerText = `"${searchKeyword}" 에 대한 검색 결과가 없습니다 :(`;
  }

  toggleMoreButton() {
    const $loadMoreButton = this.$target.querySelector(".more");

    $loadMoreButton.classList.toggle("invisible");
  }
}

export default MovieList;
