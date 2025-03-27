import { Movie } from "../../types/domain.ts";
import { selectElement } from "../utils/dom.ts";
import MovieItem from "./MovieItem";
import MovieList from "./MovieList.ts";

class SearchBar {
  #element;
  #query;

  constructor() {
    this.#element = document.createElement("div");
    this.#query = "";
  }

  create() {
    this.#element.classList.add("search-container");
    this.#element.appendChild(this.#getInputElement());
    this.#element.appendChild(this.#getImageButton());

    return this.#element;
  }

  async #onSearch(
    movieList: MovieList,
    getSearchResults: (
      query: string,
      currentItemCount: number
    ) => Promise<Movie[]>
  ) {
    const currentItemCount = movieList.getTotalItems();
    const newMovieData = await getSearchResults(this.#query, currentItemCount);

    this.#renderMovieList(newMovieData, movieList);
  }

  async #onSearchTriggerBar(
    getSearchResults: (
      query: string,
      currentItemCount: number
    ) => Promise<Movie[]>
  ) {
    const movieList = new MovieList([]);
    movieList.clearList();

    const searchBar = selectElement<HTMLInputElement>(".search-bar");
    this.#query = searchBar.value;

    this.#changeTitleStyle();
    await this.#onSearch(movieList, getSearchResults);
  }

  async setEvent(
    getSearchResults: (
      query: string,
      currentItemCount: number
    ) => Promise<Movie[]>
  ) {
    const searchBar = selectElement<HTMLInputElement>(".search-bar");
    const searchButton = selectElement<HTMLImageElement>("#search");

    searchButton.onclick = () => {
      this.#onSearchTriggerBar(getSearchResults);
    };

    const handleEnterKeyDown = async (event: KeyboardEvent) => {
      if (event.isComposing) {
        return;
      }

      if (event.key === "Enter") {
        this.#onSearchTriggerBar(getSearchResults);
        searchBar.blur();
      }
    };

    searchBar.onfocus = () => {
      window.addEventListener("keydown", handleEnterKeyDown);
    };

    searchBar.onblur = () => {
      window.removeEventListener("keydown", handleEnterKeyDown);
    };
  }

  #getInputElement() {
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.classList.add("search-bar");
    searchInput.placeholder = "검색어를 입력하세요";

    return searchInput;
  }

  #getImageButton() {
    const imgButton = document.createElement("img");
    imgButton.id = "search";
    imgButton.src = "./images/search_button.png";
    imgButton.alt = "SearchButton";

    return imgButton;
  }

  #changeTitleStyle() {
    const overlay = selectElement<HTMLDivElement>(".overlay");
    const topRatedContainer = selectElement<HTMLDivElement>(".top-rated-movie");
    const backgroundContainer = selectElement<HTMLDivElement>(
      ".background-container"
    );
    const subTitle = selectElement<HTMLHeadingElement>(".subTitle");

    subTitle.textContent = `"${this.#query}" 검색 결과`;
    overlay.style.display = "none";
    topRatedContainer.style.display = "none";
    backgroundContainer.style.height = "auto";
  }

  #renderMovieList(movies: Movie[], movieList: MovieList) {
    const movieItems = movies.map(({ id, title, posterPath, voteAverage }) => {
      const movieItem = new MovieItem({ id, title, voteAverage, posterPath });
      return movieItem.create();
    });

    movieList.updateList(movieItems);
  }
}

export default SearchBar;
