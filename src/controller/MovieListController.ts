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
    const seeMoreElement = $(".see-more", this.mainElement);
    seeMoreElement?.addEventListener("click", () => {
      this.addMovieList();
    });

    const ulElement = $("ul", this.mainElement);
    ulElement?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const item = target.closest(".item");

      if (item) {
        this.onDetailModalOpen(Number(item.id));
      }
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
    const { movieList, hasMore } = await this.fetchAndStoreMovies();
    this.renderMovieList({
      movieList,
      hasMore,
    });
    this.onAfterFetchMovieList(movieList[0]);

    this.bindEvents();
  }

  renderMovieList({ movieList, hasMore }: { movieList: IMovieItem[]; hasMore: boolean }) {
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });
    this.mainElement.replaceChildren(sectionElement);
  }

  async renderExistingMovieList() {
    const movieList = this.movieResults.getMovieList();
    const hasMore = this.movieResults.hasMore();
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });

    this.mainElement.replaceChildren(sectionElement);

    this.bindEvents();
  }

  async addMovieList() {
    const movieListContainer = $("ul", this.mainElement);
    if (!movieListContainer) return;

    const { movieList, hasMore } = await this.fetchAndStoreMovies(this.movieResults.getPage() + 1);

    movieListContainer.append(...movieList.map((movie) => MovieItem(movie)));

    if (!hasMore) $(".see-more", this.mainElement)?.remove();
  }
}

export default MovieListController;
