import { MovieInterface, ScoreType } from '../utils/type';

interface UserScoreInterface {
  movieId: number;
  movieScore: ScoreType;
}

class MovieData {
  #currentMovieList: MovieInterface[];
  #userScoreMovieList: UserScoreInterface[];

  constructor() {
    this.#currentMovieList = [];
    this.#userScoreMovieList = [];
  }

  // setMovieData(MovieList: MovieInterface[]) {
  //   this.#currentMovieList = MovieList;
  // }

  addMovieData(MovieList: MovieInterface[]) {
    this.#currentMovieList = [...this.#currentMovieList, ...MovieList];
    console.log(this.#currentMovieList);
  }

  resetMovieData() {
    this.#currentMovieList = [];
  }

  findMovie(id: number) {
    return this.#currentMovieList.find((elem) => elem.id === id);
  }

  giveUserScore(id: number, score: ScoreType) {
    const userScore = {
      movieId: id,
      movieScore: score,
    };

    this.#userScoreMovieList.push(userScore);
  }

  findUserScore(id: number) {
    return this.#userScoreMovieList.find((elem) => elem.movieId === id);
  }
}

export default new MovieData();
