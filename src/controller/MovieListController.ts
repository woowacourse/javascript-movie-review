import { getPopularMovieResult } from "../api/getPopularMovieResult";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import mainElement from "../dom/mainElement";
import MovieResults from "../domain/MovieResults";
import { IMovieItem, IMovieResult } from "../types/movieResultType";
import { $ } from "../util/selector";

class MovieListController {
  movieResults;
  mainElement;

  onAfterFetchMovieList;
  onDetailModalOpen;

  isLoading = false;

  constructor({
    onAfterFetchMovieList,
    onDetailModalOpen,
  }: {
    onAfterFetchMovieList: (movie: IMovieItem) => void;
    onDetailModalOpen: (movieId: number) => void;
  }) {
    this.movieResults = MovieResults();
    this.mainElement = mainElement;
    this.onAfterFetchMovieList = onAfterFetchMovieList;
    this.onDetailModalOpen = onDetailModalOpen;
  }

  bindEvents() {
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

      if (!scrollBottom || this.isLoading || !this.movieResults.hasMore()) return;

      this.isLoading = true;
      await this.addMovieList();
      this.isLoading = false;
    });
  }

  async fetchAndStoreMovies(page: number = 1) {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: IMovieResult = await getPopularMovieResult(page);

    this.movieResults.addMovieList(newPage, movieList);
    this.movieResults.initializeTotalPage(totalPage);

    return { movieList, hasMore: newPage !== totalPage };
  }

  async render() {
    const { movieList } = await this.fetchAndStoreMovies();
    this.renderMovieList({ movieList });
    this.onAfterFetchMovieList(movieList[0]);

    this.bindEvents();
  }

  renderMovieList({ movieList }: { movieList: IMovieItem[] }) {
    const sectionElement = MovieListSection({ title: "지금 인기 있는 영화", movieList });
    this.mainElement.replaceChildren(sectionElement);
  }

  async renderExistingMovieList() {
    const movieList = this.movieResults.getMovieList();
    const sectionElement = MovieListSection({ title: "지금 인기 있는 영화", movieList });

    this.mainElement.replaceChildren(sectionElement);

    this.bindEvents();
  }

  async addMovieList() {
    const movieListContainer = $("ul", this.mainElement);
    if (!movieListContainer) return;

    const { movieList } = await this.fetchAndStoreMovies(this.movieResults.getPage() + 1);

    movieListContainer.append(...movieList.map((movie) => MovieItem(movie)));
  }
}

export default MovieListController;
