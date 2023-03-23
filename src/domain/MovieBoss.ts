import MovieModel from "./MovieModel";
import SearchTitleBoss from "./SearchTitleBoss";
import SkeletonBoss from "./SkeletonBoss";
import ErrorBoss from "./ErrorBoss";
import { MovieValidation } from "./MovieValidation";
import { MovieElement } from "../type/componentType";
import { Movie } from "../type/movieType";

class MovieBoss {
  private subscribers: MovieElement[] = [];
  private modalSubscribers: MovieElement | undefined;

  subscribe(element: MovieElement) {
    this.subscribers.push(element);
  }

  subscribeModal(element: MovieElement) {
    this.modalSubscribers = element;
  }

  publish(movies: Movie[], isShowMore: boolean = false) {
    SkeletonBoss.removeSkeleton();
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movies, isShowMore);
    });
  }

  checkBeforePublish() {
    try {
      MovieValidation(MovieModel.getStatusCode());
    } catch (e) {
      const message = e instanceof Error ? e.message : "";
      SkeletonBoss.removeSkeleton();
      ErrorBoss.publish(message);
    }
  }

  isLastPage() {
    return MovieModel.isLastPage();
  }

  deliverModal(movie: Movie) {
    this.modalSubscribers?.rerender(movie);
  }

  async initMovies() {
    await MovieModel.updateMovies();

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async searchMovies(searchWord: string) {
    SkeletonBoss.publish();
    SearchTitleBoss.publish(searchWord);

    await MovieModel.updateMovies(searchWord);

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async showMoreMovies() {
    SkeletonBoss.publish();

    await MovieModel.updateMoreMovies();

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies, true);
  }
}

export default new MovieBoss();
