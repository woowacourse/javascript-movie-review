import type { Movie, Genre } from "./../types/type";

interface MovieHandler {
  movies: Movie[];
  genres: Genre[];
  setGenres(genres: Genre[]): void;
  addMovies(movies: Movie[]): Movie[];
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
    const newMovies = movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        vote_average: Number(movie.vote_average.toFixed(1)),
        poster_path: movie.poster_path,
        overview: movie.overview,
        genre_ids: movie.genre_ids,
        genres: movie.genre_ids.map(
          (genreID) => this.genres.find((genre) => genre.id === genreID)?.name
        ),
      };
    });
    this.movies = [...this.movies, ...newMovies];

    return newMovies;
  },

  getMovie(movieID) {
    return <Movie>this.movies.find((genre) => genre.id === movieID);
  },

  initializeMovies() {
    this.movies = [];
  },
};

export default movieHandler;
