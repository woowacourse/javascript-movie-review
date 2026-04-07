import { TMDBMovie } from "../../api/types";
import { toMovieItem } from "../../utils/transform";
import { MovieItem } from "./MovieList";

type Subscriber = (movie: MovieItem | null, isPending: boolean) => void;

export class Movie {
  private movie: TMDBMovie | null = null;
  private isPending: boolean = false;
  private subscribers: Set<Subscriber> = new Set();

  getMovie(): MovieItem | null {
    if (!this.movie) return null;
    return toMovieItem(this.movie);
  }

  getIsPending(): boolean {
    return this.isPending;
  }

  private setMovie(movie: TMDBMovie): void {
    this.movie = movie;
    this.notify();
  }

  private setIsPending(value: boolean): void {
    this.isPending = value;
    this.notify();
  }

  subscribe(subscriber: Subscriber): void {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers.delete(subscriber);
  }

  private notify(): void {
    this.subscribers.forEach((subscriber) =>
      subscriber(this.getMovie(), this.isPending),
    );
  }

  async load(_id: number): Promise<void> {
    // step2에서 구현 예정
  }
}
