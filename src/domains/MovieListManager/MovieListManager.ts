import movieFetcher from "../../http/MovieFetcher";

import { MovieItem } from "../../types/movies";
import { MovieListManagerInterface } from "./MovieListManager.type";

export default class MovieListManager implements MovieListManagerInterface {
  private static MAX_PAGE = 10;

  private currentPage: number = 0;

  private searchKeyword: string | null = null;

  constructor(searchKeyword?: string) {
    this.currentPage = 0;

    if (!searchKeyword) return;

    this.searchKeyword = searchKeyword;
  }

  private increaseCurrentPage() {
    this.currentPage += 1;
  }

  public isEndPage() {
    return this.currentPage === MovieListManager.MAX_PAGE;
  }

  public async fetchMovieList(): Promise<MovieItem[] | undefined> {
    if (typeof this.currentPage !== "number") return;

    this.increaseCurrentPage();

    return this.searchKeyword
      ? await movieFetcher.getSearchMovies(this.currentPage, this.searchKeyword)
      : await movieFetcher.getPopularMovies(this.currentPage);
  }
}
