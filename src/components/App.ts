import getPopularMovieList, { Result } from "../domain/getPopularMovieList";

import MovieHeader from "./MovieHeader/MovieHeader";
import MovieMain from "./MovieMain/MovieMain";
import getMovieListByQuery from "../domain/getMovieListByQuery";

class App {
  private static FIRST_PAGE = 1;

  private currentPage = App.FIRST_PAGE;

  private movieMain;

  constructor($root: HTMLElement) {
    this.movieMain = new MovieMain({
      onMovieMoreButtonClick: this.renderNextPage.bind(this),
    });

    $root.append(
      new MovieHeader({ search: this.searchMovies.bind(this) }).$element,
      this.movieMain.$element
    );
    setTimeout(() => {
      this.renderPopularMovieList();
    }, 1000);
  }

  private renderNextPage() {
    this.currentPage += 1;
    setTimeout(() => {
      this.renderPopularMovieList();
    }, 1000);
  }

  private async renderPopularMovieList() {
    const res = await getPopularMovieList({ page: this.currentPage });
    const movies = this.extractMovies(res.results);
    this.movieMain.reRender(movies);
  }

  private async searchMovies(query: string) {
    const res = await getMovieListByQuery({ page: this.currentPage, query });
  }

  private extractMovies(movies: Result[]) {
    return movies.map((movie) => ({
      id: movie.id,
      korTitle: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
    }));
  }
}

export default App;
