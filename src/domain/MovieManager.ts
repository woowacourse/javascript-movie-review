import Movie from "./Movie";
import { CustomElement } from "../type/componentType";
import { MovieAppData } from "../type/movieType";

class MovieManager {
  private subscribers: CustomElement[] = [];
  private skeletonSubscriber: CustomElement | undefined;
  private errorSubscriber: CustomElement | undefined;

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  subscribeSkeleton(element: CustomElement) {
    this.skeletonSubscriber = element;
  }

  subscribeError(element: CustomElement) {
    this.errorSubscriber = element;
  }

  private publish(movieAppData: MovieAppData) {
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movieAppData);
    });
  }

  private publishError(errorMessage: string) {
    this.errorSubscriber?.rerender(errorMessage);
  }

  private hideSkeleton() {
    this.skeletonSubscriber?.remove();
  }

  private showSkeleton() {
    this.skeletonSubscriber?.show();
  }

  async showMovies(searchWord: string = "") {
    try {
      this.showSkeleton();
      const movieAppData = await Movie.getMovies(searchWord);
      this.publish(movieAppData);
      this.hideSkeleton();
    } catch (e) {
      this.publishError(String(e));
    }
  }

  async showMoreMovies() {
    try {
      this.showSkeleton();
      const movieAppData = await Movie.getMoreMovies();
      this.publish(movieAppData);
      this.hideSkeleton();
    } catch (e) {
      this.publishError(String(e));
    }
  }
}

export default new MovieManager();
