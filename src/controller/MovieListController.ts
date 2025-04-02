import { getPopularMovieResult } from "../api/movie/getPopularMovieResult";
import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import PopularMovieResults from "../domain/PopularMovieResults";
import { MovieItemType, MovieResultType } from "../types/movieResultType";
import infinityScrollObserver from "../util/infinityScrollObserver";

interface MovieListControllerType {
  mainElement: HTMLElement;
  PopularMovieResults: PopularMovieResults;
}

class MovieListController {
  mainElement;
  PopularMovieResults;

  constructor({ mainElement, PopularMovieResults }: MovieListControllerType) {
    this.mainElement = mainElement;
    this.PopularMovieResults = PopularMovieResults;
  }

  async render() {
    this.mainElement.innerHTML = "";

    const hasExistingData = this.PopularMovieResults.getMovieList().length > 0;

    if (hasExistingData) {
      // 기존에 저장된 영화 리스트가 있을 경우
      const movieList = this.PopularMovieResults.getMovieList();
      const hasMore = this.PopularMovieResults.hasMore();

      this.renderMovieList({ movieList, hasMore });
    } else {
      // 없을 경우 API 호출
      const { movieList, newPage, totalPage } = await this.fetchAndStoreMovies();

      this.renderMovieList({
        movieList,
        hasMore: newPage !== totalPage,
      });
    }

    this.bindEvents();
  }

  async fetchAndStoreMovies(page: number = 1) {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: MovieResultType = await getPopularMovieResult(page);

    this.PopularMovieResults.addMovieList(newPage, movieList);
    this.PopularMovieResults.initialTotalPage(totalPage);

    return { movieList, newPage, totalPage };
  }

  renderMovieList({ movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });
    this.mainElement.appendChild(sectionElement);
  }

  async loadNextMoviePage() {
    const nextPage = this.PopularMovieResults.getPage() + 1;
    const { movieList, newPage, totalPage } = await this.fetchAndStoreMovies(nextPage);

    this.addMovieList({
      movieList,
      hasMore: newPage !== totalPage,
    });
  }

  async addMovieList({ movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
    const movieListContainer = this.mainElement.querySelector("ul");
    if (!movieListContainer) return;

    movieList.forEach((movie) => movieListContainer.appendChild(MovieItem(movie)));

    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }

  bindEvents() {
    const seeMoreElement = this.mainElement.querySelector(".see-more") as Element;
    infinityScrollObserver(seeMoreElement, this.loadNextMoviePage.bind(this));
  }
}

export default MovieListController;
