import MovieModel from "./MovieModel";
import SearchStore from "./SearchTitleStore";
import { CustomElement } from "../type/componentType";
import { Movie } from "../type/movieType";
import SkeletonStore from "./SkeletonStore";

class MovieStore {
  private subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  publish(movies: Movie[], isShowMore: boolean = false) {
    SkeletonStore.removeSkeleton();
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movies, isShowMore);
    });
  }

  async initMovies() {
    await MovieModel.updateMovies();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async searchMovies(searchWord: string) {
    SearchStore.publish(searchWord);
    SkeletonStore.publish();
    await MovieModel.updateMovies(searchWord);

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async showMoreMovies() {
    SkeletonStore.publish();
    await MovieModel.updateMoreMovies();

    const movies = MovieModel.getMovieList();
    this.publish(movies, true);
  }

  hideShowMoreButton() {
    return MovieModel.isLastPage();
  }
}

export default new MovieStore();
