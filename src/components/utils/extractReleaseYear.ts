import MovieDetails from "../../types/MovieDetails";

export default function extractReleaseYear(movieDetails: MovieDetails) {
  return movieDetails.release_date.split("-")[0];
}
