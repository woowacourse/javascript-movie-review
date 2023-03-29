import MovieModel from "./MovieModel";
import SearchTitleProcess from "./SearchTitleProcess";
import SkeletonProcess from "./SkeletonProcess";
import ErrorProcess from "./ErrorProcess";
import { MovieValidation } from "./MovieValidation";
import { MovieElement } from "../type/componentType";
import { Movie } from "../type/movieType";

class MovieProcess {
  private subscribers: MovieElement[] = [];
  private modalSubscribers: MovieElement | undefined;

  subscribe(element: MovieElement) {
    this.subscribers.push(element);
  }

  subscribeModal(element: MovieElement) {
    this.modalSubscribers = element;
  }

  publish(movies: Movie[], isShowMore: boolean = false) {
    SkeletonProcess.removeSkeleton();
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movies, isShowMore);
    });
  }

  checkBeforePublish() {
    try {
      MovieValidation(MovieModel.getStatusCode());
    } catch (e) {
      const message = e instanceof Error ? e.message : "";
      SkeletonProcess.removeSkeleton();
      ErrorProcess.publish(message);
    }
  }

  isLastPage() {
    return MovieModel.isLastPage();
  }

  async deliverMoviesModal(id: string) {
    const movie = await MovieModel.updateMovieModal(id);
    this.modalSubscribers?.rerender(movie);
  }

  async initMovies() {
    await MovieModel.updateMovies();

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async searchMovies(searchWord: string) {
    SkeletonProcess.publish();
    SearchTitleProcess.publish(searchWord);

    await MovieModel.updateMovies(searchWord);

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async showMoreMovies() {
    SkeletonProcess.publish();

    await MovieModel.updateMoreMovies();

    this.checkBeforePublish();

    const movies = MovieModel.getMovieList();
    this.publish(movies, true);
  }
}

export default new MovieProcess();
