import Component from "../Component/Component";
import "./Header.css";

class Header extends Component {
  $target;

  constructor($target) {
    super($target);
  }

  template() {
    return /*html*/ `
    <div class="header-container">
    <h1 class="logo">
      <img src="./images/logo.png" alt="MovieList" />
    </h1>
    <div class="search-bar">
      <input class="search-input" placeholder="검색어를 입력하세요" />
      <button class="search-button">
        <img src="./images/Search.png" />
      </button>
    </div>
  </div>
  `;
  }

  setEvent() {}
}
export default Header;
