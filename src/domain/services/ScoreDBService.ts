export interface DBMovieScoreType {
  id: number;
  score: number;
}

class ScoreDBService {
  MOVIE_SCORE_DB_KEY = 'movie_score';

  get() {
    return JSON.parse(localStorage.getItem(this.MOVIE_SCORE_DB_KEY) || '[]');
  }

  getScore(movieId: number) {
    const existedScoreList = this.get();

    if (existedScoreList.length) {
      const targetMovie: DBMovieScoreType = existedScoreList.filter((movie: DBMovieScoreType) => movie.id === movieId);
      return targetMovie.score;
    }

    return 0;
  }

  updateScore({ movieId, newScore }: { movieId: number; newScore: number }) {
    const existedScoreList = this.get();

    if (!existedScoreList.length) {
      const newScoreList = [{ id: movieId, score: newScore }];
      localStorage.setItem(this.MOVIE_SCORE_DB_KEY, JSON.stringify(newScoreList));
    } else {
      const restScoreList = [...existedScoreList].filter(movie => movie.id !== movieId);
      const newScoreList = [...restScoreList, { id: movieId, score: newScore }];
      localStorage.setItem(this.MOVIE_SCORE_DB_KEY, JSON.stringify(newScoreList));
    }
  }
}

export default ScoreDBService;
