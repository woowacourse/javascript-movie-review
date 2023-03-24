class MovieListTitle {
  $movieListTitle = document.createElement("h2");

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$movieListTitle.classList = "";
    this.$movieListTitle.innerText = "지금 인기 있는 영화";
  }

  render($target) {
    // $target === itemView
    $target.insertAdjacentElement("afterbegin", this.$movieListTitle);
  }

  changeInnerText(query) {
    if (query) {
      this.$movieListTitle = `"${query}" 검색 결과`;

      return;
    }

    this.$movieListTitle = "지금 인기 있는 영화";
  }
}

export default MovieListTitle;
