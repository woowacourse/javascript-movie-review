import Movie from "./Movie";
import { State, Status } from "../type/movieType";
import { apiStatus } from "../constant/movieConstants";

type Subscriber = (state: State) => void;

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

  setNewState<T>(state: T) {
    this.state = { ...this.state, ...state };
    this.publish(this.state);
  }

  async showMovies(searchWord: string = "") {
    this.setNewState({ status: apiStatus.LOADING });

    const movieAppData = await Movie.getMovies(searchWord);
    const newState = movieAppData.error
      ? { status: apiStatus.FAILURE, data: movieAppData }
      : { status: apiStatus.SUCCESS, data: movieAppData };

    this.setNewState(newState);
  }

  async showMoreMovies() {
    this.setNewState({ status: apiStatus.LOADING });

    const movieAppData = await Movie.getMoreMovies();
    const newState = movieAppData.error
      ? { status: apiStatus.FAILURE, data: movieAppData }
      : { status: apiStatus.SUCCESS, data: movieAppData };

    this.setNewState(newState);
  }

  openItemModal(id: number) {
    const modalMovieData = Movie.getMovie(id);
    this.setNewState({ data: modalMovieData });
  }
}

export default new MovieManager();
