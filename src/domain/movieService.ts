import type { Genre, MoviesResponseResult } from '../types/tmdb';
import type { Movie } from '../types/domain';

class MovieService {
  genreMap: Record<number, string>;
  movies: Movie[];

  constructor(genres: Genre[]) {
    this.genreMap = genres.reduce((obj, { id, name }) => ({ ...obj, [id]: name }), {});
    this.movies = [];
  }

  generateMovies(results: MoviesResponseResult[]): Movie[] {
    return results.map(({ id, title, poster_path, vote_average, genre_ids, overview }) => ({
      id,
      title,
      posterPath: poster_path,
      voteAverage: vote_average.toFixed(1),
      genreString: this.generateGenreString(genre_ids),
      overview,
    }));
  }

  generateGenreString(genre_ids: MoviesResponseResult['genre_ids']): string {
    return genre_ids.map((genre_id) => this.genreMap[genre_id]).join(', ');
  }

  concatMovies(newMovies: Movie[]) {
    this.movies = [...this.movies, ...newMovies];
  }

  resetMovies() {
    this.movies = [];
  }

  findMovie(id: number) {
    return this.movies.find((movie) => movie.id === id);
  }
}

export default MovieService;
