import { Movie } from "../../types/movieList";
import { StarRating } from "../../types/starRating";

export interface State {
  movies: Movie[];
  query: string;
  searchedMoviesLength: number;
  loading: boolean;
  starRatings: StarRating[];
}

type Subscriber = (state: State) => void;

class Store {
  private state: State;
  private subscribers: Subscriber[];

  constructor(initialState: State) {
    this.state = initialState;
    this.subscribers = [];
  }

  subscribe(fn: Subscriber) {
    this.subscribers.push(fn);
    fn(this.state);
  }

  setState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState };
    this.subscribers.forEach((fn) => fn(this.state));
  }

  getState(): State {
    return this.state;
  }
}

export default Store;
