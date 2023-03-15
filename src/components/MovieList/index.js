import { popularUrl } from "../../constants/urls";
import Movie from "../../domain/Movie";
import fetchApi from "../../utils/fetchApi";
import "./index.css";
import MovieItem from "./MovieItem";
import SkeletonList from "./SkeletonList";

class MovieList {
  $target;
  #type;
  #searchKeyword;
  #page;

  constructor($target, props) {
    this.$target = $target;
    this.#type = props?.type;
    this.#searchKeyword = props?.searchKeyword;
    this.#page = 1;

    this.render();
    this.setEvent();
  }

  template() {
    const title =
      this.#type === "popular"
        ? "지금 인기있는 영화"
        : `"${this.#searchKeyword}" 검색결과`;

    return `
        <section class="item-view">
          <h2>${title}</h2>
          <ul class="item-list"></ul>
          <ul class="skeleton-container"></ul>
          <button class="more btn primary full-width">더 보기</button>
        </section>
      `;
  }

  async fetchPopularMovieList() {
    const url = `${popularUrl}?api_key=${
      process.env.API_KEY
    }&language=ko&page=${this.#page++}`;

    return await fetchApi(url);
  }

  toggleSkeletonContainerVisibility() {
    const $skeletonContainer = this.$target.querySelector(
      ".skeleton-container"
    );
    $skeletonContainer.classList.toggle("visible");
  }

  async renderMovieList() {
    const $itemList = this.$target.querySelector(".item-list");

    this.toggleSkeletonContainerVisibility();
    const fetchedMovieData = await this.fetchPopularMovieList();
    this.toggleSkeletonContainerVisibility();

    const movies = fetchedMovieData.results.map(
      (movieData) => new Movie(movieData)
    );
    movies.forEach((movie) => new MovieItem($itemList, movie));
  }

  mounted() {
    const $skeletonContainer = this.$target.querySelector(
      ".skeleton-container"
    );
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
}

export default MovieList;
