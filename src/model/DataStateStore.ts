import { Movie, MovieData, MovieInfo } from '../type/movie';

class MovieListDataStateStore {
  #movieList: Movie[] | undefined;
  #isMoreData = true;
  #movieInfo: MovieInfo | undefined;

  // movie list
  getTotalMovieData(
    { movieList, isMoreData }: MovieData,
    resetMovieList: boolean,
  ) {
    this.#isMoreData = isMoreData;

    if (!this.#movieList || resetMovieList) {
      this.#movieList = movieList;
      return;
    }

    this.#movieList = this.#movieList.concat(movieList);
  }

  get movieData() {
    return {
      movieList: JSON.parse(JSON.stringify(this.#movieList)) as Movie[],
      isMoreData: this.#isMoreData,
    };
  }

  // movie info
  getMovieInfo(movieInfo: MovieInfo) {
    this.#movieInfo = movieInfo;
  }

  get movieInfo() {
    return this.#movieInfo;
  }
}

const dataStateStore = new MovieListDataStateStore();

export default dataStateStore;
