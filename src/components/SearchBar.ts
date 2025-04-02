import { Movie } from "../../types/domain.ts";
import movieService from "../service/movieService.ts";
import ScrollRenderer from "../utils/scrollRenderer.ts";
import { selectElement } from "../utils/ui.ts";
import MovieItem from "./MovieItem.ts";
import MovieList from "./MovieList.ts";
import SkeletonUl from "./SkeletonUl.ts";

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

  async #onSearch(movieList: MovieList) {
    const totalItems = movieList.getTotalItems();
    const { results } = await this.#getSearchResults(totalItems, this.#query);
    const movieItems = this.#createResultMovieItems(results);
    movieList.updateList(movieItems);

    const scrollRenderer = ScrollRenderer.getInstance();
    const updateList = this.#updateMovieList.bind(this);
    const lastMovieItemObserver = new IntersectionObserver(
      scrollRenderer.createObserverCallback(updateList, movieList),
      { threshold: 1 }
    );

    const targetElement = selectElement<HTMLLIElement>(
      "ul.thumbnail-list > li:last-child"
    );

    lastMovieItemObserver.observe(targetElement);
  }

  async #updateMovieList(
    movieList: MovieList,
    observer: IntersectionObserver,
    scrollRenderer: ScrollRenderer
  ) {
    const totalItems = movieList.getTotalItems();
    const { results } = await this.#getSearchResults(totalItems, this.#query);
    const movieItems = this.#createResultMovieItems(results);
    movieList.updateList(movieItems);

    scrollRenderer.setNewObservingTarget(
      observer,
      "ul.thumbnail-list > li:last-child"
    );
  }

  async #onSearchTriggerBar() {
    const movieList = new MovieList([]);
    movieList.clearList();

    const searchBar = selectElement<HTMLInputElement>(".search-bar");
    this.#query = searchBar.value;

    this.#changeTitleStyle();
    await this.#onSearch(movieList);
  }

  async setEvent() {
    const searchBar = selectElement<HTMLInputElement>(".search-bar");
    const searchButton = selectElement<HTMLImageElement>("#search");

    searchButton.onclick = () => {
      this.#onSearchTriggerBar();
    };

    const handleEnterKeyDown = async (event: KeyboardEvent) => {
      if (event.isComposing) {
        return;
      }

      if (event.key === "Enter") {
        this.#onSearchTriggerBar();
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

  #createResultMovieItems(movies: Movie[]): string[] {
    return movies.map(({ id, title, posterPath, voteAverage }) => {
      const movieItem = new MovieItem({ id, title, voteAverage, posterPath });
      return movieItem.create();
    });
  }

  async #getSearchResults(totalItems: number, query: string) {
    return await SkeletonUl.getInstance().getLoadingResult(() =>
      movieService.searchMovies(totalItems, query)
    );
  }
}

export default SearchBar;
