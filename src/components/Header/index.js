import "./index.css";
import Logo from "../../images/Logo.png";

class Header {
  $target;
  #props;

  constructor($target, props) {
    this.$target = $target;
    this.#props = props;

    this.render();
    this.setEvents();
  }

  template() {
    return `
    <h1><img src=${Logo} alt="MovieList 로고" /></h1>
    <form class="search-box">
      <input class="search-input" type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </form>
  `;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvents() {
    const $searchBox = this.$target.querySelector(".search-box");

    $searchBox.addEventListener("submit", (event) => {
      event.preventDefault();
      const { onSubmitSearchInput } = this.#props;

      const searchValue = event.target.querySelector(".search-input").value;
      onSubmitSearchInput("search", searchValue);
    });
  }
}

export default Header;
