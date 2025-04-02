import { getPopularMovieResult } from "../api/movie/getPopularMovieResult";
import { MovieListControllerType } from "../types/controllerType";
import { MovieResultType } from "../types/movieResultType";
import infinityScrollObserver from "../util/infinityScrollObserver";
import MovieListView from "../view/movieListView";

class MovieListController {
  mainElement;
  PopularMovieResults;
  MovieListView;

  constructor({ mainElement, PopularMovieResults }: MovieListControllerType) {
    this.mainElement = mainElement;
    this.PopularMovieResults = PopularMovieResults;
    this.MovieListView = new MovieListView(mainElement);
  }

  async initialize() {
    this.MovieListView.clearMainElement();

    if (this.PopularMovieResults.hasMovieList()) {
      this.renderStoredMovies();
    } else {
      await this.fetchAndRenderInitialMovies();
    }

    this.observeSeeMore();
  }

  renderStoredMovies() {
    const movieList = this.PopularMovieResults.getMovieList();
    const hasMore = this.PopularMovieResults.hasMore();

    this.MovieListView.renderMovieList({ movieList, hasMore });
  }

  async fetchAndRenderInitialMovies() {
    const { movieList, hasMore } = await this.fetchAndStoreMovies();
    this.MovieListView.renderMovieList({ movieList, hasMore });
  }

  async loadNextMoviePage() {
    const nextPage = this.PopularMovieResults.getPage() + 1;
    const { movieList, hasMore } = await this.fetchAndStoreMovies(nextPage);

    this.MovieListView.appendMovieList(movieList);
    this.MovieListView.handleSeeMoreElement(hasMore);
  }

  async fetchAndStoreMovies(page: number = 1) {
    const {
      page: newPage,
      total_pages: totalPage,
      results: movieList,
    }: MovieResultType = await getPopularMovieResult(page);

    this.PopularMovieResults.addMovieList(newPage, movieList);
    this.PopularMovieResults.initialTotalPage(totalPage);

    return { movieList, hasMore: newPage !== totalPage };
  }

  observeSeeMore() {
    const seeMoreElement = this.MovieListView.getSeeMoreElement();
    infinityScrollObserver(seeMoreElement, this.loadNextMoviePage.bind(this));
  }
}

export default MovieListController;
