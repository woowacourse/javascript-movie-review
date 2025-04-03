const RATING_KEY = "userRatings";

export const saveUserRating = (movieId: number, score: number) => {
  const ratings = JSON.parse(localStorage.getItem(RATING_KEY) || "{}");
  ratings[movieId] = { score };
  localStorage.setItem(RATING_KEY, JSON.stringify(ratings));
};

export const getUserRating = (movieId: number): { score: number } | null => {
  const ratings = JSON.parse(localStorage.getItem(RATING_KEY) || "{}");
  return ratings[movieId] || null;
};
