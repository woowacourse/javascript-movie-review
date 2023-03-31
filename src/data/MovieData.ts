import { localData } from '../utils/localData';
import { MovieInterface, ScoreType } from '../utils/type';

interface UserScoreInterface {
  movieId: number;
  movieScore: ScoreType;
}

class MovieData {
  #currentMovieList: MovieInterface[];
  #userScoreMovieList: Map<number, ScoreType>;

  constructor() {
    this.#currentMovieList = [];
    this.#userScoreMovieList = localData.getScoreData();
  }

  addMovieData(movieList: MovieInterface[]) {
    this.#currentMovieList = [...this.#currentMovieList, ...movieList];
  }

  resetMovieData() {
    this.#currentMovieList = [];
  }

  findMovie(id: number) {
    return this.#currentMovieList.find((elem) => elem.id === id);
  }

  giveUserScore(id: number, score: ScoreType) {
    this.#userScoreMovieList.set(id, score);

    localData.setScoreDate(this.#userScoreMovieList);
  }

  findUserScore(id: number) {
    return this.#userScoreMovieList.get(id) == undefined ? 0 : this.#userScoreMovieList.get(id);
  }
}

export default new MovieData();
