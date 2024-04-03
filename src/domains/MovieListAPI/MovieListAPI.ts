import movieFetcher from "../../http/MovieFetcher";

import { MovieItem } from "../../types/movies";
import { Optional } from "../../types/utility";

export default class MovieListAPI {
  private searchKeyword: Optional<string>;

  constructor(searchKeyword?: string) {
    if (!searchKeyword) return;

    this.searchKeyword = searchKeyword;
  }

  public async fetchMovieList(currentPage: number): Promise<Optional<MovieItem[]>> {
    return this.searchKeyword
      ? await movieFetcher.getSearchMovies(currentPage, this.searchKeyword)
      : await movieFetcher.getPopularMovies(currentPage);
  }
}
