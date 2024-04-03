import { Rate } from '../types/StarRate';
import storage from './localStorage';
import KEYS from '../constants/keys';

const { VOTE_LIST } = KEYS;

export interface IVoteMovie {
  movieId: number;
  rate: Rate;
}

const VoteMovies = {
  add(movieId: number, rate: Rate) {
    const data = { movieId, rate };
    const isAlreadyExist = this.get(movieId) !== undefined;
    if (isAlreadyExist) {
      this.remove(movieId);
    }
    storage.add<IVoteMovie>(VOTE_LIST, data);
  },

  get(movieId: number) {
    const matcher = (voteMovie: IVoteMovie) => voteMovie.movieId === movieId;
    return storage.get(VOTE_LIST, matcher);
  },

  remove(movieId: number) {
    const list = storage.list<IVoteMovie>(VOTE_LIST);
    const targetIndex = list.findIndex((item) => item.movieId === movieId);
    list.splice(targetIndex, 1);
    storage.set<IVoteMovie>(VOTE_LIST, list);
  },
};

export default VoteMovies;
