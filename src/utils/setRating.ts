export function setRating(movieId: number, rating: number): void {
  const ratedMovies = JSON.parse(localStorage.getItem("ratedMovies") || "[]");
  const existRating = ratedMovies.find(
    (movie: { id: number }) => movie.id === movieId,
  );

  if (existRating) {
    existRating.rating = rating;
  } else {
    ratedMovies.push({ id: movieId, rating });
  }

  localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
}
