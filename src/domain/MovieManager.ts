import MovieModel from "./MovieModel";
import { CustomElement } from "../type/componentType";

class MovieManage {
  private subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  publish() {
    this.subscribers.forEach((subscriber) => {
      const movies = MovieModel.movieList;
      subscriber.rerender(movies);
    });
  }
}

export default new MovieManage();
