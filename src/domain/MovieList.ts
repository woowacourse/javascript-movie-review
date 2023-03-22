import { Movie, MovieDetail } from "../types/movie";
import {
  fetchDetailedMovieData,
  fetchPopularMovieData,
  fetchSearchedMovieData,
} from "../api/index";

class MovieList {
  private static instance: MovieList;
  private currentPage: number = 1;
  private searchKey: string = "";
  private currentMovieId: number = 0;

  static getInstance(): MovieList {
    if (!MovieList.instance) {
      MovieList.instance = new MovieList();
    }

    return MovieList.instance;
  }

  init(searchKey: string) {
    this.currentPage = 1;
    this.searchKey = searchKey;
  }

  increaseCurrentPage() {
    this.currentPage += 1;
  }

  setCurrentMovieId(newMovieId: number) {
    this.currentMovieId = newMovieId;
    console.log(this.currentMovieId);
  }

  private async getPopularMovieData(): Promise<Movie[]> {
    const moviesData = await fetchPopularMovieData(this.currentPage);
    this.increaseCurrentPage();

    const movies: Movie[] = moviesData.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      vote_average: Math.round(movie.vote_average * 10) / 10,
      poster_path: movie.poster_path,
    }));

    return movies;
  }

  private async getSearchedMovieData(): Promise<Movie[]> {
    const moviesData = await fetchSearchedMovieData(
      this.searchKey,
      this.currentPage
    );
    this.increaseCurrentPage();

    const movies: Movie[] = moviesData.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      vote_average: Math.round(movie.vote_average * 10) / 10,
      poster_path: movie.poster_path,
    }));

    return movies;
  }

  async getDetailedMovieData(): Promise<MovieDetail> {
    const movieData = await fetchDetailedMovieData(this.currentMovieId);

    const movieDetail: MovieDetail = {
      id: movieData.id,
      title: movieData.title,
      genres: movieData.genres,
      overview: movieData.overview,
      vote_average: Math.round(movieData.vote_average * 10) / 10,
      poster_path: movieData.poster_path,
    };

    return movieDetail;
  }

  async getMovieData(): Promise<Movie[]> {
    return this.searchKey !== ""
      ? await this.getSearchedMovieData()
      : await this.getPopularMovieData();
  }
}

export default MovieList.getInstance();
