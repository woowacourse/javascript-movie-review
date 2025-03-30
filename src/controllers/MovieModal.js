import MovieDetailModal from "../components/MovieDetailModal";
import registerModalEventHandlers from "../controllers/MovieDetailModalHandlers";

export const ratingDescriptions = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

function MovieModal(movieData, movieId) {
  const $modalBackground = MovieDetailModal(movieData, movieId);

  registerModalEventHandlers($modalBackground, movieId);
  return $modalBackground;
}

export default MovieModal;
