import logo from "../../templates/logo.png";

class Header {
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
    $target.insertAdjacentElement("afterbegin", this.$header);
  }

  bindEvent() {
    this.$header.addEventListener("click", this.onClickHeader);
    this.$header.addEventListener("submit", this.renderSearchedMovies);
  }

  onClickHeader({ target }) {}

  renderSearchedMovies(e) {
    e.preventDefault();
  }

  getTemplate() {
    const template = `
      <h1><img src=${logo} alt="MovieList 로고" /></h1>
      <form class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>`;

    return template;
  }
}

export default Header;
