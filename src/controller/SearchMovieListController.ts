import { getSearchMovieResult } from "../api/getSearchMovieResult";
import MovieEmptySection from "../component/MovieEmptySection";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import mainElement from "../dom/mainElement";
import { IMovieItem, IMovieResult } from "../types/movieResultType";
import { $ } from "../util/selector";

class SearchMovieListController {
  mainElement;
  searchValue;
  page = 0;
  hasMore = false;

  onDetailModalOpen;

  isLoading = false;

  constructor({
    searchValue,
    onDetailModalOpen,
  }: {
    searchValue: string;
    onDetailModalOpen: (movieId: number) => void;
  }) {
    this.mainElement = mainElement;
    this.searchValue = searchValue;

    this.onDetailModalOpen = onDetailModalOpen;
  }

  async render() {
    const movieList = await this.#fetchMovies();
    this.#renderSearchMovieList({ movieList });

    this.#bindEvents();
  }

  async addMovieList() {
    const movieListContainer = $("ul", this.mainElement);
    if (!movieListContainer) return;

    const movieList = await this.#fetchMovies();

    movieListContainer?.append(...movieList.map((movie) => MovieItem(movie)));
  }

  async #fetchMovies() {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getSearchMovieResult(this.searchValue, this.page + 1);
    this.page = newPage;

    this.hasMore = newPage !== totalPage;

    return movieList;
  }

  #renderSearchMovieList({ movieList }: { movieList: IMovieItem[] }) {
    let sectionElement;
    if (movieList.length !== 0) {
      sectionElement = MovieListSection({ title: `"${this.searchValue}" 검색 결과`, movieList });
    } else {
      sectionElement = MovieEmptySection(`"${this.searchValue}" 검색 결과`);
    }

    this.mainElement.replaceChildren(sectionElement);
  }

  #bindEvents() {
    const ulElement = $("ul", this.mainElement);
    ulElement?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const item = target.closest(".item");

      if (item) {
        this.onDetailModalOpen(Number(item.id));
      }
    });

    this.bindScrollEvent();
  }

  bindScrollEvent() {
    window.addEventListener("scroll", async () => {
      const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (!scrollBottom || this.isLoading || !this.hasMore) return;

      this.isLoading = true;
      await this.addMovieList();
      this.isLoading = false;
    });
  }
}

export default SearchMovieListController;
