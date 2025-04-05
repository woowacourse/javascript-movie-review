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

  initialSubscribe(subscribers: Subscriber[]) {
    subscribers.forEach((fn) => fn(this.state));
  }

  setState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState };
    this.initialSubscribe(this.subscribers);
  }

  setMovies(movies: State["movies"]) {
    this.setState({ ...this.state, movies });
  }

  setQuery(query: State["query"]) {
    this.setState({ ...this.state, query });
  }

  setSearchedMoviesLength(searchedMoviesLength: State["searchedMoviesLength"]) {
    this.setState({ ...this.state, searchedMoviesLength });
  }

  setLoading(isLoading: State["isLoading"]) {
    this.setState({ ...this.state, isLoading });
  }

  setErrorMessage(errorMessage: State["errorMessage"]) {
    this.setState({ ...this.state, errorMessage });
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
