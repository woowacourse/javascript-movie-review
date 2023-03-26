import {
  fetchMovieGenreData,
  fetchPopularMovieData,
  fetchSearchedMovieData,
} from '../api/fetchMovieAPI';
import { Movie, MovieDataResult, MovieGenre } from '../types/movie';

class MovieAPI {
  private movieGenres: MovieGenre[] = [];
  private userMovies: Movie[];

  constructor(userMovies: Movie[]) {
    this.getMovieGenreData();
    this.userMovies = userMovies;
  }

  private async getMovieGenreData() {
    const movieGenres: MovieGenre[] = await fetchMovieGenreData();
    this.movieGenres = movieGenres;
  }

  async getPopularMovieData(currentPage: number): Promise<Movie[]> {
    const movieData: MovieDataResult[] = await fetchPopularMovieData(currentPage);
    const movies: Movie[] = this.processData(movieData);

    return movies;
  }

  async getSearchedMovieData(searchQuery: string, currentPage: number): Promise<Movie[]> {
    const movieData: MovieDataResult[] = await fetchSearchedMovieData(searchQuery, currentPage);
    const movies: Movie[] = this.processData(movieData);

    return movies;
  }

  private processData(moviesData: MovieDataResult[]) {
    const movies: Movie[] = moviesData.map((movie: MovieDataResult) => ({
      id: movie.id,
      title: movie.title,
      genres: this.convertMovieGenreId(movie.genreIds),
      releaseDate: movie.releaseDate,
      voteAverage: Math.round(movie.voteAverage * 10) / 10,
      userVote: this.getUserMovieVote(movie.id),
      overview: movie.overview,
      posterPath: movie.posterPath,
    }));

    return movies;
  }

  private convertMovieGenreId(genreIds: number[]) {
    const selectedGenres = this.movieGenres.filter((genre) => genreIds.includes(genre.id));

    return selectedGenres.map((genre) => genre.name);
  }

  private getUserMovieVote(movieId: number) {
    if (!this.userMovies.length) return 0;

    const movie = this.userMovies.find((movie) => movie.id === movieId);

    return movie?.userVote ?? 0;
  }
}

export default MovieAPI;
