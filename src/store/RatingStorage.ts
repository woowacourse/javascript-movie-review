interface IRating {
  key: number;
  score: number;
}

const RatingStorage = {
  setRatings(ratings: IRating[]) {
    localStorage.setItem('ratings', JSON.stringify(ratings));
  },

  getRatings() {
    const ratings = localStorage.getItem('ratings');
    return ratings ? JSON.parse(ratings) : [];
  },

  updateRating(rating: IRating): void {
    const ratings = this.getRatings();
    const index = ratings.findIndex((el: IRating) => el.key === rating.key);

    if (index !== -1) {
      ratings[index] = rating;
    } else {
      ratings.push(rating);
    }

    this.setRatings(ratings);
  },

  getRatingScore(key: number): number {
    const ratings = this.getRatings();
    const index = ratings.findIndex((el: IRating) => el.key === key);

    return index !== -1 ? ratings[index].score : 0;
  },
};

export default RatingStorage;
