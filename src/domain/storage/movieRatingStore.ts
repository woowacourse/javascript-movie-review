import { MovieRating } from '../../types/movie';

const movieRatingStore = {
  getMovieRating(id: number): MovieRating {
    const ratingMap = JSON.parse(localStorage.getItem('movieMyRating') || '{}');

    if (ratingMap?.[id]?.rating in [0, 2, 4, 6, 8, 10]) {
      throw new Error('local storage 저장소에 영화 평점 관련하여 잘못된 데이터가 있습니다.');
    }

    return ratingMap?.[id]?.rating || 0;
  },

  setMovieRating(id: number, rating: MovieRating): void {
    const ratingMap = JSON.parse(localStorage.getItem('rating') || '{}');
    ratingMap[id] = { rating };
    localStorage.setItem('rating', JSON.stringify(ratingMap));
  },
};

export default movieRatingStore;
