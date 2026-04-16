export function saveRating(movieId: number, rating: number): void {
  localStorage.setItem(`rating-${movieId}`, String(rating));
}

export function getRating(movieId: number): number {
  return Number(localStorage.getItem(`rating-${movieId}`)) || 0;
}
