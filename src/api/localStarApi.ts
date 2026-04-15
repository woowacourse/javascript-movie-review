export const localStarApi = {
  async saveRating(movieId: number, score: number) {
    window.localStorage.setItem(`star_${movieId}`, `${score}`);
  },

  async getRating(movieId: number) {
    const movieRatingScore = await window.localStorage.getItem(`star_${movieId}`);
    return movieRatingScore ? Number(movieRatingScore) : 0;
  },
};
