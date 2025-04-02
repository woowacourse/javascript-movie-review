import { MovieDetailInfo } from "../../types/movieType";
import MovieDetailModal from "../components/MovieDetailModal";
import MovieDetail from "./MovieDetail.ts";

export const ratingDescriptions: Record<number, string> = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

function MovieModal(movieData: MovieDetailInfo, movieId: string) {
  const $modalBackground = MovieDetailModal(movieData, movieId);
  MovieDetail($modalBackground, movieId);
  return $modalBackground;
}

export default MovieModal;
