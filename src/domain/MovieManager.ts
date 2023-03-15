import MovieModel from "./MovieModel";
import { CustomElement } from "../type/componentType";

class MovieManage {
  private subscribers: CustomElement[] = [];
  private searchSubscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  searchSubscribe(element: CustomElement) {
    this.searchSubscribers.push(element);
  }

  async publishSearch() {
    await MovieModel.getApiMovies();

    const movies = await MovieModel.getMovieList();

    this.searchSubscribers.forEach((subscriber) => {
      subscriber.rerender(movies);
    });
  }

  async publish() {
    await MovieModel.getApiMovies();

    const movies = await MovieModel.getMovieList();
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movies);
    });
  }
}

export default new MovieManage();
