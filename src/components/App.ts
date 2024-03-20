import MovieHeader from "./MovieHeader/MovieHeader";
import getMovieListByQuery from "../domain/getMovieListByQuery";

class App {
  private currentPage = 1;

  constructor($root: HTMLElement) {
    $root.append(
      new MovieHeader({ onSearchButtonClick: this.getSearchMovies.bind(this) })
        .$element
    );
  }

  private async getSearchMovies(query: string) {
    const res = await getMovieListByQuery({ page: this.currentPage, query });
    console.log(res);
  }
}

export default App;
