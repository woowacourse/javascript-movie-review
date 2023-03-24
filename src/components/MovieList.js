import SkeletonCards from "./skeletonCards";

class MovieList {
  $ul = document.createElement("ul");

  skeletons;

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$ul.classList = "item-list";

    this.skeletons = new SkeletonCards(this.$ul);
  }

  render($target) {
    // $target === $itemView
    $target.insertAdjacentElement("beforeend", this.$ul);
  }

  insertMovies() {}

  bindEvent() {}
}

export default MovieList;
