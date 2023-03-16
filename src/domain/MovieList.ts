import { API_BASE_URL } from "../constants";
import { Movie, MovieDataType } from "../types/movie";

class MovieList {
  private static instance: MovieList;
  private currentPage: number = 1;
  private searchKey: string = "";

  static getInstance(): MovieList {
    if (!MovieList.instance) {
      MovieList.instance = new MovieList();
    }

    return MovieList.instance;
  }

  initCurrentPage() {
    this.currentPage = 1;
  }

  increaseCurrentPage() {
    this.currentPage += 1;
  }

  setSearchKey(newSearchKey: string) {
    this.searchKey = newSearchKey;
  }

  async fetchPopularMovieData(): Promise<Movie[]> {
    const data = await fetch(
      `${API_BASE_URL}movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${this.currentPage}`
    );
    const movieData: MovieDataType = await data.json();
    this.increaseCurrentPage();

    return [...movieData.results];
  }

  async searchMovieData(): Promise<Movie[]> {
    const data = await fetch(
      `${API_BASE_URL}search/movie?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&query=${this.searchKey}&page=${this.currentPage}&include_adult=false`
    );
    const movieData: MovieDataType = await data.json();
    this.increaseCurrentPage();

    return [...movieData.results];
  }

  async getMovieData(): Promise<Movie[]> {
    return this.searchKey !== ""
      ? await this.searchMovieData()
      : await this.fetchPopularMovieData();
  }
}

export default MovieList.getInstance();
