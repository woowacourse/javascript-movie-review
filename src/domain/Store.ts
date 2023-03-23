import { Movie } from "../type";

export default class Store {

  private static instance: Store;
  private movies = [] as Movie[];
  private page = 1;
  private totalPage = 2;
  private lastKeyword = "";

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }

  getPage() {
    return this.page;
  }

  nextPage() {
    this.page += 1;
  }

  getTotalPage() {
    return this.totalPage;
  }

  setTotalPage(newTotalPage: number) {
    this.totalPage = newTotalPage;
  }

  getLastKeyword() {
    return this.lastKeyword;
  }

  setLastKeyword(newKeyword: string) {
    this.lastKeyword = newKeyword;
  }

  getMovies() {
    return this.movies;
  }

  appendMovies(newMovies: Movie[]) {
    this.movies = [...this.movies, ...newMovies];
  }

  resetMoviesAndPages = () => {
    this.movies = [];
    this.page = 1;
    this.totalPage = 2;
  };
}
