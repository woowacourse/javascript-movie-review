import logo from "../../templates/logo.png";

class Header {
  $header = document.createElement("header");

  constructor($target) {
    this.init();

    this.render($target);
  }

  init() {
    this.$header.classList = "";
    this.$header.innerHTML = this.getTemplate();
  }

  render($target) {
    $target.insertAdjacentElement("afterbegin", this.$header);
  }

  getTemplate() {
    const template = `
      <h1><img id="logo" src=${logo} alt="MovieList 로고" /></h1>
      <form class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>`;

    return template;
  }
}

export default Header;
