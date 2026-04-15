export const localStarApi = {
  async saveRating(movieId: number, score: number) {
    try {
      window.localStorage.setItem(`star_${movieId}`, `${score}`);
    } catch (error) {
      alert("별점 저장에 실패하였습니다. 다시 시도해주세요.");
      console.error(`로컬 스토리지 저장 실패`, error);
    };
  },

  async getRating(movieId: number) {
    const defaultValue = 0;

    try {
      const movieRatingScore = await window.localStorage.getItem(`star_${movieId}`);
      if (movieRatingScore === null) return defaultValue;
      const parsedRatingScore = Number(movieRatingScore);
      return Number.isNaN(parsedRatingScore) ?  defaultValue : parsedRatingScore;
    } catch (error) {
      alert("해당 영화의 나만의 별점을 불러오지 못했습니다. 다시 시도해주세요.");
      console.error("로컬 스토리지 데이터 로드 실패", error);
      return defaultValue;
    };
  },
};
