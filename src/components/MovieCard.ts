import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import MovieImg from "./MovieImg";
import MovieScore from "./MovieScore";
import MovieTitle from "./MovieTitle";

const MovieCard = (movie: Movie) => {
  const $card = createElementWithAttribute("div", { class: "movie-card" });
  const $img = MovieImg(movie);
  const $title = MovieTitle(movie);
  const $score = MovieScore(movie);

  $card.appendChild($img);
  $card.appendChild($title);
  $card.appendChild($score);

  return $card;
};

export default MovieCard;
