import "./TitleSearchBar.css";

class TitleSearchBar {
  constructor(setSearchKeyword, setMode) {
    this.setSearchKeyword = setSearchKeyword;
    this.setMode = setMode;
  }

  render() {
    console.log("this.setSearchKeyword, ", this.setSearchKeyword);
    const $div = document.createElement("div");
    $div.classList.add("title-search-bar");

    const $searchBar = document.createElement("div");
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

    $button.addEventListener("click", this.handleClick);

    return $div;
  }

  handleClick = async (e) => {
    console.log(this);
    const $input = document.querySelector(".search-input");

    console.log("value", $input.value);
    await this.setSearchKeyword($input.value);
    this.setMode("search");
  };
}
export default TitleSearchBar;
