import MovieHeader from "./MovieHeader/MovieHeader";
import getMovieListByQuery from "../domain/getMovieListByQuery";

class App {
  private static FIRST_PAGE = 1;

  private currentPage = App.FIRST_PAGE;

  constructor($root: HTMLElement) {
    $root.append(
      new MovieHeader({ search: this.searchMovies.bind(this) }).$element
    );
  }

  private async searchMovies(query: string) {
    const res = await getMovieListByQuery({ page: this.currentPage, query });
  }
}

export default App;
