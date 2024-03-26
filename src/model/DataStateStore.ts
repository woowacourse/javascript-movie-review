import { Movie, MovieData } from '../type/movie';

class DataStateStore {
  #movieList: Movie[] | undefined;
  #isShowMorButton = true;

  getTotalMovieData(
    { movieList, isMoreData }: MovieData,
    resetMovieList: boolean,
  ) {
    this.#isShowMorButton = isMoreData;

    if (!this.#movieList || resetMovieList) {
      this.#movieList = movieList;
      return;
    }

    this.#movieList = this.#movieList.concat(movieList);
  }

  get movieData() {
    return {
      movieList: JSON.parse(JSON.stringify(this.#movieList)) as Movie[],
      isMoreData: this.#isShowMorButton,
    };
  }
}

const dataStateStore = new DataStateStore();

export default dataStateStore;
