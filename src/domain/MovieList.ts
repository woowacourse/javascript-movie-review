import { API_BASE_URL } from "../constants";
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

  async getMovieData() {
    return this.searchKey !== ""
      ? await this.searchMovieData()
      : await this.fetchPopularMovieData();
  }

  async fetchPopularMovieData() {
    const data = await fetch(
      `${API_BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${this.currentPage}`
    );
    const movieData: MovieDataType = await data.json();
    this.currentPage = movieData.page + 1;

    return [...movieData.results];
  }

  async searchMovieData() {
    const data = await fetch(
      `${API_BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${this.searchKey}&page=${this.currentPage}&include_adult=false`
    );
    const movieData: MovieDataType = await data.json();
    this.currentPage = movieData.page + 1;

    return [...movieData.results];
  }

  initCurrentPage() {
    this.currentPage = 1;
  }
}

export default MovieList.getInstance();
