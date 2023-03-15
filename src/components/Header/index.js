import "./index.css";
import Logo from "../../images/Logo.png";
import SearchBox from "./SearchBox";

class Header {
  $target;

  constructor($target) {
    this.$target = $target;

    this.render();
  }

  template() {
    return `
    <h1><img src=${Logo} alt="MovieList 로고" /></h1>
    <div class="search-box"></div>
  `;
  }

  mounted() {
    const $searchBox = this.$target.querySelector(".search-box");

    new SearchBox($searchBox);
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}

export default Header;
