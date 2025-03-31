import "./TitleSearchBar.css";

class TitleSearchBar {
  constructor(onSubmit, $target) {
    this.onSubmit = onSubmit;
    this.$target = $target;
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
    $button.type = "submit";

    const $img = document.createElement("img");
    $img.setAttribute("src", "./images/Search.png");

    const $h1 = document.createElement("h1");
    $h1.classList.add("logo");
    const $logoImg = document.createElement("img");
    $logoImg.setAttribute("src", "./images/logo.png");
    $logoImg.setAttribute("alt", "MovieList");

    $h1.addEventListener("click", this.handleLogoClick);

    $div.appendChild($h1);
    $h1.appendChild($logoImg);

    $div.appendChild($searchBar);
    $searchBar.appendChild($input);
    $searchBar.appendChild($button);
    $button.appendChild($img);

    $searchBar.addEventListener("submit", this.onSubmit);

    this.$target.appendChild($div);
  }

  handleLogoClick() {
    const isGithubPages = window.location.hostname.includes("github.io");

    if (isGithubPages) {
      const repoName = window.location.pathname.split("/")[1];
      location.replace(`${location.origin}/${repoName}/`);
    }

    if (!isGithubPages) {
      location.replace(location.origin);
    }
  }
}
export default TitleSearchBar;
