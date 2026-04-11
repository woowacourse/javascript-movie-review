export const localStarApi = {
  async saveRating(movieId: number, score: number) {
    window.localStorage.setItem(`${movieId}`, `${score}`);
  },

  async getRating(movieId: number) {
    const movieRatingScore = await window.localStorage.getItem(`${movieId}`);
    return movieRatingScore ? Number(movieRatingScore) : 0;
  },
};
