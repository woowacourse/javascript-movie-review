import { State } from "../../types/movie";

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

export default new Store({
  movies: [],
  query: "",
  searchedMoviesLength: 0,
  isLoading: false,
  errorMessage: "",
});
