import Movie from "./Movie";
import { CustomElement } from "../type/componentType";
import { MovieAppData, State } from "../type/movieType";

type Subscriber = (state: State) => void;

class MovieManager {
  private state: State = {
    status: "loading",
    data: {},
    error: {},
  };
  private subscribers: Subscriber[] = [];

  subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  private publish(state: State) {
    this.subscribers.forEach((subscriber) => {
      subscriber(state);
    });
  }

  setNewState<T>(state: T) {
    this.state = { ...this.state, ...state };
  }

  async showMovies(searchWord: string = "") {
    this.setNewState({ status: "loading" });
    this.publish(this.state);

    const movieAppData = await Movie.getMovies(searchWord);

    if (movieAppData.error) {
      this.setNewState({ status: "failure", error: movieAppData });
    } else {
      this.setNewState({ status: "success", data: movieAppData });
    }

    this.publish(this.state);
  }

  async showMoreMovies() {
    this.setNewState({ status: "loading" });
    this.publish(this.state);

    const movieAppData = await Movie.getMoreMovies();

    if (movieAppData.error) {
      this.setNewState({ status: "failure", error: movieAppData });
    } else {
      this.setNewState({ status: "success", data: movieAppData });
    }

    this.publish(this.state);
  }

  openItemModal(id: number) {
    const movieData = Movie.getMovie(id);
    this.setNewState({ data: movieData });
    this.publish(this.state);
  }
}

export default new MovieManager();
