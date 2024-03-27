import { Movie, MovieData } from "../type/movie";

class MovieDataStateStore {
  #movieList: Movie[] | undefined;
  #isShowMorButton = true;

  getTotalMovieData(
    { movieList, isShowMoreButton }: MovieData,
    resetMovieList: boolean,
  ) {
    if (!this.#movieList || resetMovieList) this.#movieList = movieList;
    else this.#movieList = this.#movieList.concat(movieList);

    this.#isShowMorButton = isShowMoreButton;
  }

  get movieData() {
    return {
      movieList: JSON.parse(JSON.stringify(this.#movieList)) as Movie[],
      isShowMoreButton: this.#isShowMorButton,
    };
  }
}

const movieDataStateStore = new MovieDataStateStore();

export default movieDataStateStore;
