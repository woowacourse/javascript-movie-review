import { IRating } from '../domain/Rating/Rating.type';

const RatingStorage = {
  setRatings(ratings: IRating[]) {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  },

  getRatings() {
    const ratings = localStorage.getItem('ratings');
    return ratings ? JSON.parse(ratings) : [];
  },
};

export default RatingStorage;
