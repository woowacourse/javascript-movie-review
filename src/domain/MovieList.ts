import { Movie, MovieDataResult } from '../types/movie';
import { fetchPopularMovieData, fetchSearchedMovieData } from '../api/movieAPI';

class MovieList {
  private static instance: MovieList;
  private currentPage: number = 1;
  private searchQuery: string = '';

  static getInstance(): MovieList {
    if (!MovieList.instance) {
      MovieList.instance = new MovieList();
    }

    return MovieList.instance;
  }

  init(searchQuery: string = '') {
    this.currentPage = 1;
    this.searchQuery = searchQuery;
  }

  private increaseCurrentPage() {
    this.currentPage += 1;
  }

  private async processMovieData(
    fetchFunction: () => Promise<MovieDataResult[]>
  ): Promise<Movie[]> {
    const moviesData: MovieDataResult[] = await fetchFunction();
    this.increaseCurrentPage();

    const movies: Movie[] = moviesData.map((movie: MovieDataResult) => ({
      id: movie.id,
      title: movie.title,
      voteAverage: Math.round(movie.voteAverage * 10) / 10,
      posterPath: movie.posterPath,
    }));

    return movies;
  }

  private async getPopularMovieData(): Promise<Movie[]> {
    return this.processMovieData(() => fetchPopularMovieData(this.currentPage));
  }

  private async getSearchedMovieData(): Promise<Movie[]> {
    return this.processMovieData(() => fetchSearchedMovieData(this.searchQuery, this.currentPage));
  }

  async getMovieData() {
    const movies =
      this.searchQuery !== ''
        ? await this.getSearchedMovieData()
        : await this.getPopularMovieData();

    return { movies, searchQuery: this.searchQuery };
  }
}

export default MovieList.getInstance();
