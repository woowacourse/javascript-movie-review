import storage from '../../utils/storage';

interface UserRating {
  movieId: number;
  rateScore: number;
}

const UserRatingStore = {
  store(id: number, score: number) {
    const userRatingList = storage.get<UserRating[]>();
    const isExisting = userRatingList.some(rate => rate.movieId === id);

    const newRatingList = isExisting
      ? userRatingList.map(rate => (rate.movieId === id ? { movieId: id, rateScore: score } : rate))
      : [...userRatingList, { movieId: id, rateScore: score }];

    storage.set<UserRating[]>(newRatingList);
  },

  fetch() {
    return storage.get<UserRating[]>();
  },
};

export default UserRatingStore;
