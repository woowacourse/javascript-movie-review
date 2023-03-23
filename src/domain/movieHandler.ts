import type { Movie, Genre } from "./../types/type";

interface MovieHandler {
  movies: Movie[];
  genres: Genre[];
  setGenres(genres: Genre[]): void;
  addMovies(movies: Movie[]): void;
  getMovie(movieID: number): Movie;
  initializeMovies(): void;
}

const movieHandler: MovieHandler = {
  movies: [],
  genres: [],

  setGenres(genres: Genre[]) {
    this.genres = genres;
  },

  addMovies(movies) {
    this.movies = movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
        overview: movie.overview,
        genre_ids: movie.genre_ids,
        genres: movie.genre_ids.map(
          (genreID) => this.genres.find((genre) => genre.id === genreID)?.name
        ),
      };
    });
  },

  getMovie(movieID) {
    return <Movie>this.movies.find((genre) => genre.id === movieID);
  },

  initializeMovies() {
    this.movies = [];
  },
};

export default movieHandler;
