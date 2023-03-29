import { MovieScoreInfo } from '../types/type';

const MOVIE_SCORE_KEY = 'movieScore';

const userMovieScore = {
  getUserData: (): MovieScoreInfo[] => {
    return JSON.parse(localStorage.getItem(MOVIE_SCORE_KEY) || '[]');
  },

  getScore: (id: number): number => {
    const EMPTY_SCORE = 0;
    const movieScore: MovieScoreInfo[] = userMovieScore.getUserData();
    const movie = movieScore.find((item: MovieScoreInfo) => item.id === id);

    if (!movie) {
      return EMPTY_SCORE;
    }

    return movie.score;
  },

  setUserData: (userScore: MovieScoreInfo): void => {
    const movieScore: MovieScoreInfo[] = userMovieScore.getUserData();

    const movieTargetIndex = movieScore.findIndex((item: MovieScoreInfo) => item.id === userScore.id);

    if (movieTargetIndex === -1) {
      userMovieScore.create({ movieScore, userScore });
      return;
    }
    if (userScore.score === movieScore[movieTargetIndex].score) {
      userMovieScore.delete({ movieScore, movieTargetIndex });
      return;
    }

    userMovieScore.update({ movieScore, userScore, movieTargetIndex });
  },

  create: ({ movieScore, userScore }: { movieScore: MovieScoreInfo[]; userScore: MovieScoreInfo }) => {
    const updatedMovieScore = [...movieScore, userScore];

    localStorage.setItem(MOVIE_SCORE_KEY, JSON.stringify(updatedMovieScore));
  },

  delete: ({ movieScore, movieTargetIndex }: { movieScore: MovieScoreInfo[]; movieTargetIndex: number }): void => {
    const updatedMovieScore = movieScore;

    updatedMovieScore.splice(movieTargetIndex, 1);
    localStorage.setItem(MOVIE_SCORE_KEY, JSON.stringify(updatedMovieScore));
  },

  update: ({
    movieScore,
    movieTargetIndex,
    userScore,
  }: {
    movieScore: MovieScoreInfo[];
    movieTargetIndex: number;
    userScore: MovieScoreInfo;
  }): void => {
    const updatedMovieScore = movieScore;
    updatedMovieScore.splice(movieTargetIndex, 1, userScore);
    localStorage.setItem(MOVIE_SCORE_KEY, JSON.stringify(updatedMovieScore));
  },

  getIsReviewed: (id: string): boolean => {
    const movieScore: MovieScoreInfo[] = userMovieScore.getUserData();

    return movieScore.some(movie => movie.id === Number(id));
  },
};

export default userMovieScore;
