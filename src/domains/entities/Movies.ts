import { MovieResult, MoviesResponse } from "../../api/types/movie/response";

export default class Movies {
  private static instance: Movies;
  private _movies: MovieResult[] = [];

  static getInstance(): Movies {
    if (!Movies.instance) Movies.instance = new Movies();
    return Movies.instance;
  }

  get movies() {
    return [...this._movies];
  }

  updateMovies(data: MoviesResponse) {
    this._movies = [...this._movies, ...data.results];
  }

  getFirstMovie() {
    return this._movies[0];
  }

  findMovieById(id: number): MovieResult | undefined {
    return this._movies.find((movie) => movie.id === id);
  }

  isEmpty() {
    return this._movies.length === 0;
  }

  reset() {
    this._movies = [];
  }
}
