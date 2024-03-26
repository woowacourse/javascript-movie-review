import starFilled from "../../templates/star_filled.png";
import { STAR_IMG_ALT } from "../constants/system";
import { createElementWithAttribute } from "../utils";

const MovieScore = (voteAverage: number, className: string) => {
  const $score = createElementWithAttribute("p", { class: className });
  const $star = createElementWithAttribute("img", {
    src: starFilled,
    alt: STAR_IMG_ALT,
  });

  $score.appendChild($star);
  $score.appendChild(document.createTextNode(voteAverage.toString()));

  return $score;
};
export default MovieScore;
