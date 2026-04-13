import { MovieDetail } from "../../api/types";
import { fetchMovieDetail } from "../../api/movies";

export interface MovieDetailEvent {
  isPending: boolean;
  detail: MovieDetail | null;
  error: boolean;
}

type Subscriber = (event: MovieDetailEvent) => void;

export class MovieService {
  private isPending = false;
  private error = false;
  private subscribers: Set<Subscriber> = new Set();

  subscribe(subscriber: Subscriber): void {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers.delete(subscriber);
  }

  async load(id: number): Promise<void> {
    if (this.isPending) return;

    this.error = false;
    this.setIsPending(true);

    try {
      const detail = await fetchMovieDetail(id);
      this.isPending = false;
      this.notify(detail);
    } catch {
      this.isPending = false;
      this.error = true;
      this.notify(null);
    }
  }

  private setIsPending(value: boolean): void {
    this.isPending = value;
    this.notify(null);
  }

  private notify(detail: MovieDetail | null): void {
    this.subscribers.forEach((subscriber) =>
      subscriber({
        isPending: this.isPending,
        detail,
        error: this.error,
      }),
    );
  }
}
