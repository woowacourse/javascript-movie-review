import MovieModel from "./MovieModel";
import { CustomElement } from "../type/componentType";
import { ModelData, Movie } from "../type/movieType";

class MovieManager {
  private subscribers: CustomElement[] = [];
  private skeleton: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  subscribeSkeleton(element: CustomElement) {
    this.skeleton.push(element);
  }

  toggleButton() {
    return MovieModel.isLastPage();
  }

  showSkeleton() {
    this.skeleton.forEach((subscriber) => {
      subscriber.render();
    });
  }

  async publish(data: ModelData, isShowMore: boolean = false) {
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(data, isShowMore);
    });
  }

  async searchMovies(searchWord: string = "") {
    await MovieModel.getApiMovies(searchWord);

    const data = await MovieModel.getData();
    this.publish(data);
  }

  async showMoreMovies() {
    await MovieModel.getApiMoreMovies();

    const data = await MovieModel.getData();
    this.publish(data, true);
  }
}

export default new MovieManager();
