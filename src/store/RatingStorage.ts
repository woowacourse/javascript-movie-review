interface IRating {
  key: number;
  score: number;
}

const RatingStorage = {
  setRating(rating: IRating): void {
    const ratings = JSON.parse(localStorage.getItem('ratings') ?? '');

    const index = ratings.findIndex((el: IRating) => el.key === rating.key);

    if (index !== -1) {
      ratings[index] = rating;
    } else {
      ratings.push(rating);
    }

    localStorage.setItem('ratings', JSON.stringify(ratings));
  },

  getRating(key: number) {
    const ratings = JSON.parse(localStorage.getItem('ratings') ?? '');

    const index = ratings.findIndex((el: IRating) => el.key === key);

    return index !== -1 ? ratings[index] : 0;
  },
};

export default RatingStorage;
