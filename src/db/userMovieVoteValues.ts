import { Movie } from '../service/types';
import { StarRate } from './types';

const key = 'userMovieVoteValues';

const getUserMovieVoteValues = (): Record<Movie['id'], StarRate> => {
  return JSON.parse(localStorage.getItem(key) ?? '{}');
};

const getUserMovieVoteValue = (id: Movie['id']): StarRate => {
  return getUserMovieVoteValues()[id];
};

const setUserMovieVoteValues = (id: Movie['id'], starRate: StarRate) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      ...getUserMovieVoteValues(),
      [id]: starRate,
    }),
  );
};

export { getUserMovieVoteValues, getUserMovieVoteValue, setUserMovieVoteValues };
