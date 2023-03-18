import Movie from "./Movie";
import { CustomElement } from "../type/componentType";
import { MovieAppData } from "../type/movieType";

class MovieManager {
  private subscribers: CustomElement[] = [];
  private skeletonSubscriber: CustomElement | undefined;
  private errorSubscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  subscribeSkeleton(element: CustomElement) {
    this.skeletonSubscriber = element;
  }

  subscribeError(element: CustomElement) {
    this.errorSubscribers.push(element);
  }

  private publish(movieAppData: MovieAppData) {
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movieAppData);
    });
  }

  private publishError() {
    this.errorSubscribers.forEach((subscriber) => {
      subscriber.render();
    });
  }

  private hideSkeleton() {
    this.skeletonSubscriber?.remove();
  }

  showSkeleton() {
    this.skeletonSubscriber?.render();
  }

  async showMovies(searchWord: string = "") {
    const movieAppData = await Movie.getMovies(searchWord);
    this.publish(movieAppData);
    this.hideSkeleton();
  }

  async showMoreMovies() {
    const movieAppData = await Movie.getMoreMovies();
    this.publish(movieAppData);
  }
}

export default new MovieManager();
