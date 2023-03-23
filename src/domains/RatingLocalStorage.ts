import userRatingChecker from './userRatingChecker';
const LOCAL_STORAGE_KEY = 'userRating';

const ratingLocalStorage = {
  getAllMovieRatingData(): Record<number, number> {
    try {
      const ratingData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '');
      if (userRatingChecker.check(ratingData)) {
        return ratingData;
      }

      this.clearRating();
      return {};
    } catch {
      this.clearRating();
      return {};
    }
  },

  getMovieRating(movieId: number) {
    const ratingData = this.getAllMovieRatingData();

    return ratingData[movieId] || 0;
  },

  setMovieRating(movieId: number, rating: number) {
    const ratingData = this.getAllMovieRatingData();
    ratingData[movieId] = rating;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ratingData));
    console.log('OK local storage', movieId);
  },

  clearRating() {
    localStorage.setItem(LOCAL_STORAGE_KEY, '{}');
  },
};

export default ratingLocalStorage;
