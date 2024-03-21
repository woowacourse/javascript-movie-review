import starFilled from "../../templates/star_filled.png";
import { Movie } from "../type/movie";
import { createElementWithAttribute } from "../utils";

const MovieScore = (movie: Movie) => {
  const $score = createElementWithAttribute("p", { class: "item-score" });
  const $star = createElementWithAttribute("img", {
    src: starFilled,
    alt: "별점",
  });

  $score.appendChild($star);
  $score.appendChild(document.createTextNode(movie.vote_average.toString()));

  return $score;
};
export default MovieScore;
