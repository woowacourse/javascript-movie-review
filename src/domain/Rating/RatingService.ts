import { IRating } from './Rating.type';
import RatingStorage from '../../store/RatingStorage';

const RatingService = {
  updateRating(rating: IRating): void {
    const ratings = RatingStorage.getRatings();
    const index = ratings.findIndex((el: IRating) => el.key === rating.key);

    if (index !== -1) {
      ratings[index] = rating;
    } else {
      ratings.push(rating);
    }

    RatingStorage.setRatings(ratings);
  },

  getRatingScore(key: number): number {
    const ratings = RatingStorage.getRatings();
    const index = ratings.findIndex((el: IRating) => el.key === key);

    return index !== -1 ? ratings[index].score : 0;
  },
};

export default RatingService;
