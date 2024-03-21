import getMovieListByQuery, {
  SearchMovieResult,
} from "../domain/getMovieListByQuery";
import getPopularMovieList, {
  PopularMovieResult,
} from "../domain/getPopularMovieList";

import MOVIE_LIST_BOX_TITLE from "../constants/movieListBoxTitle";
import MovieHeader from "./MovieHeader/MovieHeader";
import MovieMain from "./MovieMain/MovieMain";

class App {
  private static FIRST_PAGE = 1;

  private currentPage = App.FIRST_PAGE;

  private movieMain;
  private query = "";

  constructor($root: HTMLElement) {
    this.movieMain = new MovieMain({
      title: MOVIE_LIST_BOX_TITLE.popular,
      onMovieMoreButtonClick: this.renderNextPage.bind(this),
    });

    $root.append(
      new MovieHeader({
        logoClickHandler: this.logoClickHandler.bind(this),
        searchBoxSubmitHandler: this.searchBoxSubmitHandler.bind(this),
      }).$element,
      this.movieMain.$element
    );
    this.renderPopularMovieList();
  }

  private logoClickHandler() {
    this.query = "";
    this.currentPage = App.FIRST_PAGE;

    this.movieMain.changeMovieListBox({
      title: MOVIE_LIST_BOX_TITLE.popular,
      onMovieMoreButtonClick: this.renderNextPage.bind(this),
    });

    this.renderPopularMovieList();
  }

  private searchBoxSubmitHandler(query: string) {
    this.currentPage = App.FIRST_PAGE;
    this.query = query;

    this.movieMain.changeMovieListBox({
      title: MOVIE_LIST_BOX_TITLE.search(query),
      onMovieMoreButtonClick: this.renderSearchNextPage.bind(this),
    });
    this.searchMovies(query);
  }

  private renderNextPage() {
    this.currentPage += 1;
    this.renderPopularMovieList();
  }

  private renderSearchNextPage() {
    this.currentPage += 1;
    this.searchMovies(this.query);
  }

  private async renderPopularMovieList() {
    const res = await getPopularMovieList({ page: this.currentPage });
    const movies = this.extractMovies(res.results);
    setTimeout(() => {
      this.movieMain.reRender(movies);
    }, 500);
  }

  private async searchMovies(query: string) {
    const res = await getMovieListByQuery({ page: this.currentPage, query });
    const movies = this.extractMovies(res.results);

    if (this.currentPage === res.total_pages) {
      this.movieMain.removeMovieMoreButton();
    }

    setTimeout(() => {
      this.movieMain.reRender(movies);
    }, 500);
  }

  private extractMovies(movies: SearchMovieResult[] | PopularMovieResult[]) {
    return movies.map((movie) => ({
      id: movie.id,
      korTitle: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));
  }
}

export default App;
