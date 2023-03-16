import Movie from "./Movie";
import { CustomElement } from "../type/componentType";
import { MovieAppData } from "../type/movieType";

class MovieManager {
  private subscribers: CustomElement[] = [];
  private skeleton: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  subscribeSkeleton(element: CustomElement) {
    this.skeleton.push(element);
  }

  publish(data: MovieAppData) {
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(data);
    });
  }

  showSkeleton() {
    this.skeleton.forEach((subscriber) => {
      subscriber.render();
    });
  }

  async showMovies(searchWord: string = "") {
    const movieAppData = await Movie.getMovies(searchWord);
    this.publish(movieAppData);
  }

  async showMoreMovies() {
    const movieAppData = await Movie.getMoreMovies();
    this.publish(movieAppData);
  }
}

export default new MovieManager();
