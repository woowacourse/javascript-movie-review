import { Movie } from "../../types/domain.ts";
import { ERROR, STATUS_MESSAGE } from "../constants/error.ts";
import movieService from "../service/movieService.ts";
import ScrollRenderer from "../utils/scrollRenderer.ts";
import { selectElement } from "../utils/ui.ts";
import ErrorUI from "./ErrorUI.ts";
import MovieItem from "./MovieItem.ts";
import MovieList from "./MovieList.ts";
import SkeletonUl from "./SkeletonUl.ts";

class SearchBar {
  #element;
  #query;

  constructor() {
    this.#element = document.createElement("form");
    this.#element.id = "search-container";
    this.#query = "";
  }

  create() {
    this.#element.appendChild(this.#createInputBar());
    this.#element.appendChild(this.#createInputImage());

    return this.#element;
  }

  async #onSearch(movieList: MovieList) {
    const totalItems = movieList.getTotalItems();
    const searchData = await this.#getSearchResults(totalItems, this.#query);
    if (searchData) {
      const { results } = searchData;
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
  }

  async #updateMovieList(
    movieList: MovieList,
    observer: IntersectionObserver,
    scrollRenderer: ScrollRenderer
  ) {
    const totalItems = movieList.getTotalItems();
    const searchData = await this.#getSearchResults(totalItems, this.#query);
    if (searchData) {
      const { results } = searchData;
      const movieItems = this.#createResultMovieItems(results);
      movieList.updateList(movieItems);

      scrollRenderer.setNewObservingTarget(
        observer,
        "ul.thumbnail-list > li:last-child"
      );
    }
  }

  async #onSubmitQuery(event: SubmitEvent) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    this.#query = formData.get("query") as string;

    const movieList = new MovieList([]);
    movieList.clearList();

    this.#changeTitleStyle();
    await this.#onSearch(movieList);
  }

  setEvent() {
    this.#element.addEventListener("submit", (event) =>
      this.#onSubmitQuery(event)
    );
  }

  #createInputBar() {
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.name = "query";
    searchInput.classList.add("search-bar");
    searchInput.placeholder = "검색어를 입력하세요";

    return searchInput;
  }

  #createInputImage() {
    const inputImage = document.createElement("input");
    inputImage.type = "image";
    inputImage.id = "search";
    inputImage.src = "./images/search_button.png";
    inputImage.alt = "SearchButton";

    return inputImage;
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
    try {
      return await SkeletonUl.getInstance().getLoadingResult(() =>
        movieService.searchMovies(totalItems, query)
      );
    } catch (error) {
      if (error instanceof Error) {
        const status = Number(error.message);
        const message = STATUS_MESSAGE[status] ?? ERROR.DEFAULT;
        const errorUI = new ErrorUI({ status, message });
        errorUI.create();
        errorUI.renderError();
      }
    }
  }
}

export default SearchBar;
