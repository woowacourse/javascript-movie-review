export function setRating(movieId, score) {
  const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
  ratings[movieId] = score;
  localStorage.setItem("ratings", JSON.stringify(ratings))
}

export function getRating(movieId) {
  const ratings = JSON.parse(localStorage.getItem("ratings") || "{}");
  return ratings[movieId] || 0;
}