import MovieModel from "./MovieModel";
import SearchStore from "./SearchTitleStore";
import SkeletonStore from "./SkeletonStore";
import ErrorStore from "./ErrorStore";
import { MovieValidation } from "./MovieValidation";
import { MovieElement } from "../type/componentType";
import { Movie } from "../type/movieType";

class MovieStore {
  private subscribers: MovieElement[] = [];

  subscribe(element: MovieElement) {
    this.subscribers.push(element);
  }

  publish(movies: Movie[], isShowMore: boolean = false) {
    SkeletonStore.removeSkeleton();
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movies, isShowMore);
    });
  }

  checkBeforePublish() {
    try {
      MovieValidation(MovieModel.getStatusCode());
    } catch (e) {
      const message = e instanceof Error ? e.message : "";
      SkeletonStore.removeSkeleton();
      ErrorStore.publish(message);
    }
  }

  isLastPage() {
    return MovieModel.isLastPage();
  }

  async initMovies() {
    await MovieModel.updateMovies();

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async searchMovies(searchWord: string) {
    SkeletonStore.publish();
    SearchStore.publish(searchWord);

    await MovieModel.updateMovies(searchWord);

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async showMoreMovies() {
    SkeletonStore.publish();

    await MovieModel.updateMoreMovies();

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies, true);
  }
}

export default new MovieStore();
