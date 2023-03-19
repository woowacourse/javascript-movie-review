import MovieModel from "./MovieModel";
import { CustomElement } from "../type/componentType";
import { Movie } from "../type/movieType";

class MovieManage {
  private subscribers: CustomElement[] = [];
  private searchSubscribers: CustomElement[] = [];
  private skeleton: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  subscribeSkeleton(element: CustomElement) {
    this.skeleton.push(element);
  }

  subscribeSearch(element: CustomElement) {
    this.searchSubscribers.push(element);
  }

  hideShowMoreButton() {
    return MovieModel.isLastPage();
  }

  showSkeleton() {
    this.skeleton.forEach((subscriber) => {
      subscriber.render();
    });
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
}

export default new MovieManage();
