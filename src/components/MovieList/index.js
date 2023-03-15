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

  #movies;

  constructor($target, props) {
    this.$target = $target;
    this.#type = props?.type;
    this.#searchKeyword = props?.searchKeyword;
    this.#page = 1;

    this.render();
    this.fetchPopularMovieList();
  }

  template() {
    const title =
      this.#type === "popular"
        ? "지금 인기있는 영화"
        : `"${this.#searchKeyword}" 검색결과`;

    return `
        <section class="item-view">
          <h2>${title}</h2>
          <ul id="item-list" class="item-list"></ul>
          <ul class="skeleton-container item-list"></ul>
          <button class="btn primary full-width">더 보기</button>
        </section>
      `;
  }

  async fetchPopularMovieList() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${
      process.env.API_KEY
    }&language=ko&page=${this.#page}`;

    const fetchedData = await fetchApi(url);
    this.movies = fetchedData.results.map((movieData) => new Movie(movieData));

    const $itemList = this.$target.querySelector("#item-list");
    this.movies.forEach((movie) => new MovieItem($itemList, movie));
  }

  mounted() {
    const $skeletonContainer = this.$target.querySelector(
      ".skeleton-container"
    );
    new SkeletonList($skeletonContainer);
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}

export default MovieList;
