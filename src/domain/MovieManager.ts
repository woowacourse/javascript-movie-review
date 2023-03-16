import MovieModel from "./MovieModel";
import { CustomElement } from "../type/componentType";
import { Movie, MoviesData } from "../type/movieType";

class MovieManage {
  private subscribers: CustomElement[] = [];
  private searchSubscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.subscribers.push(element);
  }

  searchSubscribe(element: CustomElement) {
    this.searchSubscribers.push(element);
  }

  toggleButton() {
    return MovieModel.isLastPage();
  }

  async publishSearch(searchWord: string) {
    this.searchSubscribers.forEach((subscriber) => {
      subscriber.rerender(searchWord);
    });
  }

  async publish(movies: Movie[], isShowMore: boolean = false) {
    this.subscribers.forEach((subscriber) => {
      subscriber.rerender(movies, isShowMore);
    });
  }

  async initMovies() {
    await MovieModel.getApiMovies();

    const movies = await MovieModel.getMovieList();
    this.publish(movies);
  }

  async searchMovies(searchWord: string) {
    await MovieModel.getApiMovies(searchWord);

    const movies = await MovieModel.getMovieList();
    this.publishSearch(searchWord);
    this.publish(movies);
  }

  async showMoreMovies() {
    await MovieModel.getApiMoreMovies();

    const movies = await MovieModel.getMovieList();
    this.publish(movies, true);
  }
}

export default new MovieManage();
