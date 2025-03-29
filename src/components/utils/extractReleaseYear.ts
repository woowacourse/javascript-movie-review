import MovieDetails from "../../types/MovieDetails";

export default function extractGenres(movieDetails: MovieDetails) {
  return movieDetails.genres.map((genre) => genre.name).join(", ");
}
