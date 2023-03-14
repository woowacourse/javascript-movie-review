import { Movie, MovieDataType } from "../types/movie";

class MovieList {
  private static instance: MovieList;
  private currentPage: number = 1;

  static getInstance() {
    if (!MovieList.instance) {
      MovieList.instance = new MovieList();
    }

    return MovieList.instance;
  }

  constructor() {}

  async fetchMovieData() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=f34d1031242e2e85f709994a1cede895&language=en-US&page=${this.currentPage}`
    );
    const movieData: MovieDataType = await data.json();
    this.currentPage = movieData.page + 1;

    return [...movieData.results];
  }

  async searchMovieData(searchKey: string) {
    // 초기화
    const data = await fetch(
      ` https://api.themoviedb.org/3/search/movie?api_key=f34d1031242e2e85f709994a1cede895&language=en-US&query=${searchKey}&page=${this.currentPage}&include_adult=false`
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
