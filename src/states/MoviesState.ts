import { Movie } from "../components/templates/composeMovieItem";
import Observable from "./abstract/Observable";

export default class MoviesState extends Observable {
  private movies: Movie[];

  constructor(movieData = []) {
    super();
    this.movies = movieData;
  }

  public set(movies: Movie[]): void {
    this.movies = movies;
    this.notify();
  }

  public get(): Movie[] {
    return this.movies;
  }
}
