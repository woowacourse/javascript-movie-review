import { Movie } from "../../types/domain.ts";
import movieService from "../service/movieService.ts";
import ScrollRenderer from "../utils/scrollRenderer.ts";
import { fetchMovies, selectElement } from "../utils/ui.ts";
import MovieItem from "./MovieItem.ts";
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
    const totalItems = movieList.getTotalItems();
    const newMovieData = await getSearchResults(this.#query, totalItems);
    const movieItems = this.#createResultMovieItems(newMovieData);
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
    const newMovieData = await this.#getSearchResults(this.#query, totalItems);
    const movieItems = this.#createResultMovieItems(newMovieData);
    movieList.updateList(movieItems);

    scrollRenderer.setNewObservingTarget(
      observer,
      "ul.thumbnail-list > li:last-child"
    );
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

  async setEvent() {
    const searchBar = selectElement<HTMLInputElement>(".search-bar");
    const searchButton = selectElement<HTMLImageElement>("#search");
    const apiFetcher = this.#getSearchResults.bind(this);

    searchButton.onclick = () => {
      this.#onSearchTriggerBar(apiFetcher);
    };

    const handleEnterKeyDown = async (event: KeyboardEvent) => {
      if (event.isComposing) {
        return;
      }

      if (event.key === "Enter") {
        this.#onSearchTriggerBar(apiFetcher);
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

  #createResultMovieList(movies: Movie[]) {
    const movieItems = this.#createResultMovieItems(movies);
    return new MovieList(movieItems);
  }

  async #getSearchResults(query: string, currentItemCount: number) {
    return await fetchMovies({
      currentItemCount,
      apiFetcher: (page, query) => movieService.searchMovies(page, query ?? ""),
      query,
    });
  }
}

export default SearchBar;
