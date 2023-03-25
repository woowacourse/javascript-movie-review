import Movie from "./Movie";
import { State, Status, Subscriber } from "../type/movieType";
import { apiStatus } from "../constant/movieConstants";

class MovieManager {
  private state: State = {
    status: <Status>apiStatus.LOADING,
    data: {},
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

  setNewState<T>(newState: T) {
    this.state = { ...this.state, ...newState };
    this.publish(this.state);
  }

  async showMovies(searchWord: string = "") {
    this.setNewState({ status: apiStatus.LOADING });

    const movieAppData = await Movie.getMovies(searchWord);
    const newState = {
      status: movieAppData.error ? apiStatus.FAILURE : apiStatus.SUCCESS,
      data: movieAppData,
    };
    this.setNewState(newState);
  }

  async showMoreMovies() {
    this.setNewState({ status: apiStatus.LOADING });

    const movieAppData = await Movie.getMoreMovies();
    const newState = {
      status: movieAppData.error ? apiStatus.FAILURE : apiStatus.SUCCESS,
      data: movieAppData,
    };

    this.setNewState(newState);
  }

  openItemModal(id: number) {
    const modalMovieData = Movie.getMovie(id);
    this.setNewState({ data: modalMovieData });
  }
}

export default new MovieManager();
