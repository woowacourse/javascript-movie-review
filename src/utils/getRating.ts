export function getRating(movieId: number): number | null {
  const ratedMovies = JSON.parse(localStorage.getItem("ratedMovies") || "[]");
  const existRating = ratedMovies.find(
    (movie: { id: number }) => movie.id === movieId,
  );
  return existRating ? existRating.rating : null;
}
