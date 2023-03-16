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
    await Movie.getApiMovies(searchWord);

    const data = await Movie.getData();
    this.publish(data);
  }

  async showMoreMovies() {
    await Movie.getApiMoreMovies();

    const data = await Movie.getData();
    this.publish(data);
  }
}

export default new MovieManager();
