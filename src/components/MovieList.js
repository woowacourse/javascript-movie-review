class MovieList {
  $ul = document.createElement("ul");

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$ul.classList = "item-list";
    this.$ul.innerHTML = "";
  }

  render($target) {
    // $target === $itemView
    $target.insertAdjacentHTML("beforeend", this.$ul);
  }

  addMovies() {}

  bindEvent() {}
}
