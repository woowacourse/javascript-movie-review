import "./TitleSearchBar.css";

class TitleSearchBar {
  constructor(onSubmit, onLogoClick) {
    this.onSubmit = onSubmit;
    this.onLogoClick = onLogoClick;
  }

  render() {
    const $div = document.createElement("div");
    $div.classList.add("title-search-bar");

    const $searchBar = document.createElement("form");
    $searchBar.classList.add("search-bar");

    const $input = document.createElement("input");
    $input.placeholder = "검색어를 입력하세요.";
    $input.classList.add("search-input");

    const $button = document.createElement("button");
    $button.classList.add("search-button");

    const $img = document.createElement("img");
    $img.setAttribute("src", "./images/Search.png");

    $div.innerHTML = /*html*/ `
    <h1 class="logo">
      <img src="./images/logo.png" alt="MovieList" />
    </h1>
    `;

    $div.appendChild($searchBar);
    $searchBar.appendChild($input);
    $searchBar.appendChild($button);
    $button.appendChild($img);

    $searchBar.addEventListener("submit", this.onSubmit);
    $div.querySelector(".logo").addEventListener("click", this.onLogoClick);

    return $div;
  }
}
export default TitleSearchBar;
