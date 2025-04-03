import Movie from "../../store/Movie";

export default function extractGenres(movieDetails: Movie) {
  return movieDetails.genres.map((genre) => genre).join(", ");
}
