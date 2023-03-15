import { MovieDataType } from "../types/movie";

class MovieList {
  private static instance: MovieList;
  private currentPage: number = 1;
  private searchKey: string = "";

  static getInstance() {
    if (!MovieList.instance) {
      MovieList.instance = new MovieList();
    }

    return MovieList.instance;
  }

  setSearchKey(newSearchKey: string) {
    this.searchKey = newSearchKey;
  }

  async fetchPopularMovieData() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=f34d1031242e2e85f709994a1cede895&language=ko-KR&page=${this.currentPage}`
    );
    const movieData: MovieDataType = await data.json();
    this.currentPage = movieData.page + 1;

    return [...movieData.results];
  }

  async searchMovieData() {
    const data = await fetch(
      ` https://api.themoviedb.org/3/search/movie?api_key=f34d1031242e2e85f709994a1cede895&language=ko-KR&query=${this.searchKey}&page=${this.currentPage}&include_adult=false`
    );
    const movieData: MovieDataType = await data.json();
    this.currentPage = movieData.page + 1;

    return [...movieData.results];
  }

  async getMovieData() {
    return this.searchKey !== ""
      ? await this.searchMovieData()
      : await this.fetchPopularMovieData();
  }

  initCurrentPage() {
    this.currentPage = 1;
  }
}

export default MovieList.getInstance();
