import { updateMovies } from "../components/MovieList/movieListHandler";
import { Movie } from "../type";

export default class Store {
  private static instance: Store;
  private movies = [] as Movie[];

  private constructor() { }

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }

  getMovies() {
    return this.movies;
  }

  initMovies() {
    this.movies = [];
  }

  appendMovies(newMovies: Movie[]) {
    this.movies = [...this.movies, ...newMovies];

    updateMovies(); // 수정 예정
  }
}


