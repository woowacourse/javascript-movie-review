class MovieListTitle {
  $header = document.createElement("header");

  constructor($target) {
    this.init();

    this.render($target);

    this.bindEvent();
  }

  init() {
    this.$header.classList = "";
    this.$header.innerHTML = this.getTemplate();
  }

  render($target) {
    // $target === $app
    $target.insertAdjacentHTML("afterbegin", this.$header);
  }

  bindEvent() {}

  getTemplate() {
    const template = `
        <h1><img src="./logo.png" alt="MovieList 로고" /></h1>
        <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </div>`;

    return template;
  }
}

export default MovieListTitle;
