import "./TitleSearchBar.css";

class Header {
  render() {
    const $div = document.createElement("div");
    $div.classList.add("title-search-bar");

    $div.innerHTML = /*html*/ `
    <h1 class="logo">
      <img src="./images/logo.png" alt="MovieList" />
    </h1>
    <div class="search-bar">
      <input class="search-input" placeholder="검색어를 입력하세요" />
      <button class="search-button">
        <img src="./images/Search.png" />
      </button>
    </div>
    `;

    return $div;
  }

  setEvent() {}
}
export default Header;
