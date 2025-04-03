import Movie from "../../store/Movie";

export default function extractReleaseYear(movieDetails: Movie) {
  return movieDetails.releaseDate.split("-")[0];
}
