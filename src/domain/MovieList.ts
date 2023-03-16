import { API_BASE_URL } from "../constants";
import { Movie, MovieDataType } from "../types/movie";
import { fetchPopularMovieData, fetchSearchedMovieData } from "../api/index";

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

  async getPopularMovieData(): Promise<Movie[]> {
    const movieData: Movie[] = await fetchPopularMovieData(this.currentPage);
    this.increaseCurrentPage();

    const movies: Movie[] = movieData.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
    }));

    return movies;
  }

  async getSearchedMovieData(): Promise<Movie[]> {
    const movieData = await fetchSearchedMovieData(
      this.searchKey,
      this.currentPage
    );
    this.increaseCurrentPage();

    const movies: Movie[] = movieData.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
    }));

    return movies;
  }

  async getMovieData(): Promise<Movie[]> {
    return this.searchKey !== ""
      ? await this.getSearchedMovieData()
      : await this.getPopularMovieData();
  }
}

export default MovieList.getInstance();
