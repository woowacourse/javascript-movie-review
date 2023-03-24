class MovieView {
  $itemView = document.createElement("section");

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$itemView.classList = "item-view";

    // new Header($target);
    // new MovieList($target);
  }

  render($target) {
    // $target === $main
    $target.insertAdjacentHTML("afterbegin", this.$itemView);
  }
}

export default MovieView;
