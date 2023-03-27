import { MovieScoreInfo } from '../types/type';

const MOVIE_SCORE_KEY = 'movieScore';

const userMovieScore = {
  getLocalStorage: (): MovieScoreInfo[] => {
    return JSON.parse(localStorage.getItem(MOVIE_SCORE_KEY) || '[]');
  },

  getScore: (id: number): number => {
    const movieScore: MovieScoreInfo[] = userMovieScore.getLocalStorage();
    const movie = movieScore.find((item: MovieScoreInfo) => item.id === id);

    if (!movie) {
      return 0;
    }

    return movie.score;
  },

  setLocalStorage: (userScore: MovieScoreInfo): void => {
    const movieScore: MovieScoreInfo[] = userMovieScore.getLocalStorage();

    const findIndex = movieScore.findIndex((item: MovieScoreInfo) => item.id === userScore.id);

    if (findIndex === -1) {
      const updatedMovieScore = [...movieScore, userScore];
      localStorage.setItem(MOVIE_SCORE_KEY, JSON.stringify(updatedMovieScore));
      return;
    }

    const updatedMovieScore = movieScore;
    updatedMovieScore.splice(findIndex, 1, userScore);
    localStorage.setItem(MOVIE_SCORE_KEY, JSON.stringify(updatedMovieScore));
  },

  getIsReviewed: (id: string): boolean => {
    const movieScore: MovieScoreInfo[] = JSON.parse(localStorage.getItem(MOVIE_SCORE_KEY) || '[]');

    return movieScore.some(movie => movie.id === Number(id));
  },
};

export default userMovieScore;
