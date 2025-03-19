import { IPage } from "../../types/domain";
import { TMDB_TOKEN } from "../constants/api";
import MovieItem from "./MovieItem";

class SearchBar {
  constructor() {}

  create() {
    const searchContainerElement = document.createElement("div");
    searchContainerElement.classList.add("search-container");

    const content = /*html*/ `
      <input
        type="text"
        class="search-bar"
        placeholder="검색어를 입력하세요"
      />
    `;

    searchContainerElement.insertAdjacentHTML("beforeend", content);
    const imgButton = document.createElement("img");
    imgButton.id = "search";
    imgButton.src = "./images/search_button.png";
    imgButton.alt = "SearchButton";
    imgButton.onclick = () => this.onSearchClick();
    searchContainerElement.appendChild(imgButton);

    return searchContainerElement;
  }

  onSearchClick() {
    const searchBar = document.querySelector(".search-bar") as HTMLInputElement;
    const thumbnailList = document.querySelector("ul.thumbnail-list");
    const query = searchBar.value;

    this.changeTitleStyle(query);
    this.toggleNoThumbnail("hidden");

    thumbnailList?.replaceChildren();

    this.getSearchResult(query);

    const seeMoreButton = document.querySelector(
      "#seeMore"
    ) as HTMLButtonElement;

    seeMoreButton.classList.add("hidden");
    seeMoreButton.onclick = () => {
      this.getSearchResult(query);
    };
  }

  changeTitleStyle(query: string) {
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const topRatedContainer = document.querySelector(
      ".top-rated-movie"
    ) as HTMLDivElement;
    const backgroundContainer = document.querySelector(
      ".background-container"
    ) as HTMLDivElement;
    const subTitle = document.querySelector(".subTitle") as HTMLHeadingElement;

    subTitle.textContent = `"${query}" 검색 결과`;
    overlay.style.display = "none";
    topRatedContainer.style.display = "none";
    backgroundContainer.style.height = "auto";
  }

  getSearchResult(query: string) {
    const thumbnailList = document.querySelector("ul.thumbnail-list");
    const itemCount = document.querySelectorAll("ul.thumbnail-list li").length;
    const pageNumber = itemCount / 20 + 1;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    };

    try {
      fetch(
        `https://api.themoviedb.org/3/search/movie?page=${pageNumber}&query=${query}&language=ko-KR`,
        options
      )
        .then((response) => response.json())
        .then((data: IPage) => {
          const seeMoreButton = document.querySelector(
            "#seeMore"
          ) as HTMLButtonElement;
          seeMoreButton.classList.add("hidden");
          if (pageNumber < data.total_pages)
            seeMoreButton.classList.remove("hidden");

          if (data.total_results === 0) this.toggleNoThumbnail("show");

          data.results.forEach(({ title, poster_path, vote_average }) => {
            const movieItem = new MovieItem({
              title,
              vote_average,
              poster_path,
            });
            const movieItemElement = movieItem.create();
            thumbnailList?.appendChild(movieItemElement);
          });
        });
    } catch (error) {
      alert("검색 결과를 불러올 수 없습니다.");
    }
  }

  toggleNoThumbnail(option: "show" | "hidden") {
    const noThumbnail = document.querySelector(".no-thumbnail");
    if (option === "show") noThumbnail?.classList.remove("hidden");
    if (option === "hidden") noThumbnail?.classList.add("hidden");
  }
}

export default SearchBar;
