import { MovieDetail } from "../../api/types";
import { MovieService } from "../../services/movie/MovieService";
import { RatingService } from "../../services/rating/RatingService";

export interface ModalState {
  isPending: boolean;
  error: boolean;
  detail: MovieDetail | null;
  myRating: number | null;
}

type Subscriber = (state: ModalState) => void;

export class ModalViewModel {
  private movieService: MovieService;
  private ratingService: RatingService;
  private currentMovieId: number | null = null;
  private subscribers: Set<Subscriber> = new Set();

  private state: ModalState = {
    isPending: false,
    error: false,
    detail: null,
    myRating: null,
  };

  constructor() {
    this.movieService = new MovieService();
    this.ratingService = new RatingService();

    this.movieService.subscribe(({ isPending, error, data: detail }) => {
      this.setState({ isPending, error, detail });
    });
  }

  subscribe(subscriber: Subscriber): void {
    this.subscribers.add(subscriber);
  }

  getState(): ModalState {
    return this.state;
  }

  open(id: number): void {
    this.currentMovieId = id;
    this.setState({ myRating: this.ratingService.get(id) });
    this.movieService.load(id);
  }

  setRating(score: number): void {
    if (this.currentMovieId === null) return;
    this.ratingService.set(this.currentMovieId, score);
    this.setState({ myRating: score });
  }

  getSavedRating(): number | null {
    if (this.currentMovieId === null) return null;
    return this.ratingService.get(this.currentMovieId);
  }

  private setState(partial: Partial<ModalState>): void {
    this.state = { ...this.state, ...partial };
    this.subscribers.forEach((sub) => sub(this.state));
  }
}
