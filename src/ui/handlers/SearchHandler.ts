import MovieListHandler from "./MovieListHandler.js";

export default class SearchHandler {
  constructor(private movieListHandler: MovieListHandler) {}

  async handleSearch(query: string) {
    this.hideHeader();
    await this.movieListHandler.initMovieList(query);
  }

  hideHeader() {
    document.querySelector(".overlay")?.classList.add("hide");
    document.querySelector(".top-rated-movie")?.classList.add("hide");
    document
      .querySelector(".background-container")
      ?.classList.add("hide-background");
  }
}
