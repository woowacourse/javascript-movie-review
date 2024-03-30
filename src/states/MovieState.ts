import Observable from "./abstract/Observable";

type MovieId = number | null;

export default class MovieState extends Observable {
  private movieId: MovieId;

  constructor(movieId = null) {
    super();
    this.movieId = movieId;
  }

  public set(movieId: MovieId): void {
    this.movieId = movieId;
    this.notify();
  }

  public get(): MovieId {
    return this.movieId;
  }
}
