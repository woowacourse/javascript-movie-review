import Movie from "./Movie";
import { State, Status } from "../type/movieType";
import { apiStatus } from "../constant/movieConstants";

type Subscriber = (state: State) => void;

class MovieManager {
  private state: State = {
    status: <Status>apiStatus.LOADING,
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
    this.publish(this.state);
  }

  async showMovies(searchWord: string = "") {
    this.setNewState({ status: apiStatus.LOADING });

    const movieAppData = await Movie.getMovies(searchWord);

    if (movieAppData.error) {
      this.setNewState({ status: apiStatus.FAILURE, error: movieAppData });
    } else {
      this.setNewState({ status: apiStatus.SUCCESS, data: movieAppData });
    }
  }

  async showMoreMovies() {
    this.setNewState({ status: apiStatus.LOADING });

    const movieAppData = await Movie.getMoreMovies();

    if (movieAppData.error) {
      this.setNewState({ status: apiStatus.FAILURE, error: movieAppData });
    } else {
      this.setNewState({ status: apiStatus.SUCCESS, data: movieAppData });
    }
  }

  openItemModal(id: number) {
    const movieData = Movie.getMovie(id);
    this.setNewState({ data: movieData });
  }
}

export default new MovieManager();
