import { Movie } from '../types/movie';
import { fetchPopularMovieData, fetchSearchedMovieData } from '../api/index';

class MovieList {
  private static instance: MovieList;
  private currentPage: number = 1;
  private searchKey: string = '';

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

  private async getPopularMovieData(): Promise<Movie[]> {
    const moviesData: Movie[] = await fetchPopularMovieData(this.currentPage);
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
    const moviesData: Movie[] = await fetchSearchedMovieData(this.searchKey, this.currentPage);
    this.increaseCurrentPage();

    const movies: Movie[] = moviesData.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      vote_average: Math.round(movie.vote_average * 10) / 10,
      poster_path: movie.poster_path,
    }));

    return movies;
  }

  async getMovieData(): Promise<Movie[]> {
    return this.searchKey !== ''
      ? await this.getSearchedMovieData()
      : await this.getPopularMovieData();
  }
}

export default MovieList.getInstance();
