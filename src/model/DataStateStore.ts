import { Movie, MovieData } from '../type/movie';

class DataStateStore {
  #movieList: Movie[] | undefined;
  #isShowMorButton = true;

  getTotalMovieData(
    { movieList, isShowMoreButton }: MovieData,
    resetMovieList: boolean,
  ) {
    this.#isShowMorButton = isShowMoreButton;

    if (!this.#movieList || resetMovieList) {
      this.#movieList = movieList;
      return;
    }

    this.#movieList = this.#movieList.concat(movieList);
  }

  get movieData() {
    return {
      movieList: JSON.parse(JSON.stringify(this.#movieList)) as Movie[],
      isShowMoreButton: this.#isShowMorButton,
    };
  }
}

const dataStateStore = new DataStateStore();

export default dataStateStore;
