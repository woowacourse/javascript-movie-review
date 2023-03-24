class MovieList {
  $ul = document.createElement("ul");

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$ul.classList = "item-list";
    this.$ul.innerHTML = `<li>나 아이템</li>`;
  }

  render($target) {
    // $target === $itemView
    $target.insertAdjacentElement("beforeend", this.$ul);
  }

  addMovies() {}

  bindEvent() {}
}

export default MovieList;
