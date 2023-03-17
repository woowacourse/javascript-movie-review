import { Movie, MovieDataResult } from '../types/movie';
import { fetchPopularMovieData, fetchSearchedMovieData } from '../api/movieAPI';

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

  init(searchKey: string = '') {
    this.currentPage = 1;
    this.searchKey = searchKey;
  }

  private increaseCurrentPage() {
    this.currentPage += 1;
  }

  private async processMovieData(
    fetchFunction: () => Promise<MovieDataResult[]>
  ): Promise<Movie[]> {
    const moviesData: MovieDataResult[] = await fetchFunction();
    this.increaseCurrentPage();

    const movies: Movie[] = moviesData.map((movie: Movie) => ({
      id: movie.id,
      title: movie.title,
      vote_average: Math.round(movie.vote_average * 10) / 10,
      poster_path: movie.poster_path,
    }));

    return movies;
  }

  private async getPopularMovieData(): Promise<Movie[]> {
    return this.processMovieData(() => fetchPopularMovieData(this.currentPage));
  }

  private async getSearchedMovieData(): Promise<Movie[]> {
    return this.processMovieData(() => fetchSearchedMovieData(this.searchKey, this.currentPage));
  }

  async getMovieData() {
    const movies =
      this.searchKey !== '' ? await this.getSearchedMovieData() : await this.getPopularMovieData();

    return { movies, searchKey: this.searchKey };
  }
}

export default MovieList.getInstance();
