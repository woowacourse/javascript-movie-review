import { MovieRating } from '../../types/movie';

const movieRatingStore = {
  getMovieRating(id: number): MovieRating {
    const ratingMap = JSON.parse(localStorage.getItem('movieMyRating') || '{}');

    const rating = ratingMap?.[id]?.rating || 0;

    return rating;
  },

  setMovieRating(id: number, rating: MovieRating) {
    const ratingMap = JSON.parse(localStorage.getItem('rating') || '{}');
    ratingMap[id] = { rating };
    localStorage.setItem('rating', JSON.stringify(ratingMap));
  },
};

export default movieRatingStore;
