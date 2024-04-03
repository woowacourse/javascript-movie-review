import Observable from "./abstract/Observable";

interface MovieDetailModalStateData {
  isOpen: boolean;
  movieId: number;
}

export default class MovieDetailModalState extends Observable {
  private isOpen: boolean;
  private movieId: number;

  constructor(isOpen = false, movieId = 0) {
    super();
    this.isOpen = isOpen;
    this.movieId = movieId;
  }

  public set({ isOpen, movieId }: MovieDetailModalStateData): void {
    this.isOpen = isOpen;
    this.movieId = movieId;

    this.notify();
  }

  public get(): MovieDetailModalStateData {
    return { isOpen: this.isOpen, movieId: this.movieId };
  }
}
