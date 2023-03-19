import MovieModel from "./MovieModel";
import { CustomElement } from "../type/componentType";
import { Movie } from "../type/movieType";

class MovieManage {
  private subscribers: CustomElement[] = [];
  private searchSubscribers: CustomElement[] = [];
  private skeletons: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  subscribeSkeletons(element: CustomElement) {
    this.skeletons.push(element);
  }

  subscribeSearch(element: CustomElement) {
    this.searchSubscribers.push(element);
  }

  publishSearch(searchWord: string) {
    this.searchSubscribers.forEach((subscriber) => {
      subscriber.rerender(searchWord);
    });
  }

  publish(movies: Movie[], isShowMore: boolean = false) {
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movies, isShowMore);
    });
  }

  publishSkeleton() {
    this.skeletons.forEach((subscriber) => {
      subscriber.render();
    });
  }

  async initMovies() {
    await MovieModel.updateMovies();

    const movies = MovieModel.getMovieList();
    this.publish(movies);
  }

  async searchMovies(searchWord: string) {
    await MovieModel.updateMovies(searchWord);

    const movies = MovieModel.getMovieList();
    this.publishSearch(searchWord);
    this.publish(movies);
  }

  async showMoreMovies() {
    await MovieModel.updateMoreMovies();

    const movies = MovieModel.getMovieList();
    this.publish(movies, true);
  }

  hideShowMoreButton() {
    return MovieModel.isLastPage();
  }
}

export default new MovieManage();
