import { Movie, MovieData } from "../type/movie";

class MovieDataStateStore {
  #fetchedMovieList: Movie[] | undefined;
  #isEndPage = true;

  addMovieData({ movieList, isEndPage }: MovieData) {
    this.#fetchedMovieList = movieList;
    this.#isEndPage = isEndPage;
  }

  get fetchedMovieData() {
    return {
      movieList: this.#fetchedMovieList,
      isEndPage: this.#isEndPage,
    };
  }
}

const movieDataStateStore = new MovieDataStateStore();

export default movieDataStateStore;
