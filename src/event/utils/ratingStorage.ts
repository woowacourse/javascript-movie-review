const key = "userRating";

function fetchAllMovieRatings() {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, "[]");
    return [];
  }
  return JSON.parse(raw);
}

export function fetchMovieRatingById(movieId: number) {
  const movieRatings: { id: number; rate: number }[] = fetchAllMovieRatings();

  const existingMovie = movieRatings.find((rating) => rating.id === movieId);

  if (existingMovie) return existingMovie.rate;
  return 0;
}

export function saveMovieRatingById({
  movieId,
  movieRate,
}: {
  movieId: number;
  movieRate: number;
}) {
  const movieRatings: { id: number; rate: number }[] = fetchAllMovieRatings();

  if (!movieRatings) return;

  const existingMovie = movieRatings.find((rating) => rating.id === movieId);
  if (existingMovie) {
    existingMovie.rate = movieRate;
  } else {
    movieRatings.push({ id: movieId, rate: movieRate });
  }

  localStorage.setItem(key, JSON.stringify(movieRatings));
}
