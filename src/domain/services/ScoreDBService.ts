export interface DBMovieScoreType {
  id: number;
  score: number;
}

export const MOVIE_SCORE_DB_KEY = 'movie_score';

class ScoreDBService {
  static get() {
    return JSON.parse(localStorage.getItem(MOVIE_SCORE_DB_KEY) || '[]');
  }

  static getScore(movieId: number) {
    const existedScoreList = this.get();

    if (existedScoreList.length) {
      const targetMovie: DBMovieScoreType = existedScoreList.filter(
        (movie: DBMovieScoreType) => Number(movie.id) === movieId,
      )[0];
      return targetMovie ? targetMovie.score : 0;
    }

    return 0;
  }

  static updateScore({ movieId, newScore }: { movieId: number; newScore: number }) {
    const existedScoreList = this.get();

    if (!existedScoreList.length) {
      const newScoreList = [{ id: movieId, score: newScore }];
      localStorage.setItem(MOVIE_SCORE_DB_KEY, JSON.stringify(newScoreList));
    } else {
      const restScoreList = [...existedScoreList].filter(movie => movie.id !== movieId);
      const newScoreList = [...restScoreList, { id: movieId, score: newScore }];
      localStorage.setItem(MOVIE_SCORE_DB_KEY, JSON.stringify(newScoreList));
    }
  }
}

export default ScoreDBService;
