import starFilled from "../../templates/star_filled.png";
import { STAR_IMG_ALT } from "../constants/system";
import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

const MovieScore = (movie: Movie) => {
  const $score = createElementWithAttribute("p", { class: "item-score" });
  const $star = createElementWithAttribute("img", {
    src: starFilled,
    alt: STAR_IMG_ALT,
  });

  $score.appendChild($star);
  $score.appendChild(document.createTextNode(movie.vote_average.toString()));

  return $score;
};
export default MovieScore;
