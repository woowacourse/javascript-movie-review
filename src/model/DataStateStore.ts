import { Movie } from "../type/movie";

interface DataProps {
  movieData: Movie[];
  isShowMoreButton: boolean;
}
class DataStateStore {
  #movieList: Movie[] | undefined;
  #isShowMorButton = true;

  getTotalMovieData(
    { movieData, isShowMoreButton }: DataProps,
    resetMovieList: boolean,
  ) {
    if (!this.#movieList || resetMovieList) this.#movieList = movieData;
    else this.#movieList = this.#movieList.concat(movieData);

    this.#isShowMorButton = isShowMoreButton;
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
