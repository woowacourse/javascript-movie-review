const key = "userRating";

//read
function readAllStoredMovieRatings() {
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, "[]");
    return [];
  }
  return JSON.parse(raw);
}

//read
export function readStoredMovieRatingById(movieId: number) {
  const movieRatings: { id: number; rate: number }[] =
    readAllStoredMovieRatings();

  const existingMovie = movieRatings.find((rating) => rating.id === movieId);

  if (existingMovie) return existingMovie.rate;
  return 0;
}

//update
export function updateStoredMovieRatingById({
  movieId,
  movieRate,
}: {
  movieId: number;
  movieRate: number;
}) {
  const movieRatings: { id: number; rate: number }[] =
    readAllStoredMovieRatings();

  if (!movieRatings) return;

  const existingMovie = movieRatings.find((rating) => rating.id === movieId);
  if (existingMovie) {
    existingMovie.rate = movieRate;
  } else {
    movieRatings.push({ id: movieId, rate: movieRate });
  }

  localStorage.setItem(key, JSON.stringify(movieRatings));
}
