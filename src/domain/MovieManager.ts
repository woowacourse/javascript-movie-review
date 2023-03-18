import Movie from "./Movie";
import { CustomElement } from "../type/componentType";
import { MovieAppData } from "../type/movieType";

class MovieManager {
  private subscribers: CustomElement[] = [];
  private skeleton: CustomElement[] = [];
  private errorSubscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  subscribeSkeleton(element: CustomElement) {
    this.skeleton.push(element);
  }

  subscribeError(element: CustomElement) {
    this.errorSubscribers.push(element);
  }

  publish(movieAppData: MovieAppData) {
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movieAppData);
    });
  }

  publishError() {
    this.errorSubscribers.forEach((subscriber) => {
      subscriber.render();
    });
  }

  publishSkeleton() {
    this.skeleton.forEach((subscriber) => {
      subscriber.render();
    });
  }

  async showMovies(searchWord: string = "") {
    try {
      this.publishSkeleton();
      const movieAppData = await Movie.getMovies(searchWord);
      this.publish(movieAppData);
    } catch {
      this.publishError();
    }
  }

  async showMoreMovies() {
    try {
      this.publishSkeleton();
      const movieAppData = await Movie.getMoreMovies();
      this.publish(movieAppData);
    } catch {
      this.publishError();
    }
  }
}

export default new MovieManager();
