import { IRating } from './Rating.type';
import Storage from '../../store/Storage';

const RatingService = {
  updateRating(rating: IRating): void {
    const ratings = Storage.getItem<IRating>('ratings');
    const index = ratings.findIndex((el: IRating) => el.key === rating.key);

    if (index !== -1) {
      ratings[index] = rating;
    } else {
      ratings.push(rating);
    }

    Storage.setItem<IRating>('ratings', ratings);
  },

  getRatingScore(key: number): number {
    const ratings = Storage.getItem<IRating>('ratings');
    const index = ratings.findIndex((el: IRating) => el.key === key);

    return index !== -1 ? ratings[index].score : 0;
  },
};

export default RatingService;
