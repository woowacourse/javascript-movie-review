import { LOCAL_STORAGE_KEY } from '../../consts/common';

interface UserRating {
  movieId: number;
  rateScore: number;
}

const UserRatingStore = {
  store(id: number, score: number) {
    const userRatingList = this.fetch();
    const isExisting = userRatingList.some(rate => rate.movieId === id);

    if (isExisting) {
      const newRatingList = userRatingList.map(rate =>
        rate.movieId === id ? { movieId: id, rateScore: score } : rate,
      );
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRatingList));
    } else {
      const newRatingList = [...userRatingList, { movieId: id, rateScore: score }];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRatingList));
    }
  },

  fetch(): UserRating[] {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  },
};

export default UserRatingStore;
