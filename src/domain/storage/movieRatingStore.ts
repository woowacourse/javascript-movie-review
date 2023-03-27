const movieRatingStore = {
  getMovieRating(id: number) {
    const ratingMap = JSON.parse(localStorage.getItem('rating') || '{}');
    return Number(ratingMap?.[id]) || 0;
  },

  setMovieRating(id: number, rating: number) {
    const ratingMap = JSON.parse(localStorage.getItem('rating') || '{}');
    ratingMap[id] = rating;
    localStorage.setItem('rating', JSON.stringify(ratingMap));
  },
};

export default movieRatingStore;
