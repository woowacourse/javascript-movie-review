import "./index.css";
import MovieItem from "./MovieItem";
import SkeletonList from "./SkeletonList";

class MovieList {
  $target;
  #type;
  #searchKeyword;

  constructor($target, props) {
    this.$target = $target;
    this.#type = props?.type;
    this.#searchKeyword = props?.searchKeyword;

    this.render();
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

  mounted() {
    // fetch(
    //   "https://api.themoviedb.org/3/movie/popular?api_key=ef7c54f21b65b1fe66b6cf70349fa55f&language=ko&page=1"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     document.querySelector("#temp").innerHTML = data.results
    //       .map((item) => item.title)
    //       .join("<br>");
    //   });
    // return `<div id='temp' class='item-list'>${SkeletonList()}</div>`;
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
