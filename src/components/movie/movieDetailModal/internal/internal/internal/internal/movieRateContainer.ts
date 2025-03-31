import { MovieDetail } from "../../../../../../../domain/types";
import { createElementWithAttributes } from "../../../../../../utils/createElementWithAttributes";
import movieRateBox from "./internal/movieRateBox";

const movieRateContainer = (movie: MovieDetail) => {
  const $movieRateContainer = createElementWithAttributes({
    tag: "div",
    className: "movie-rate-container",
    children: [{ tag: "h3", textContent: "내 별점" }],
  });

  const $movieRateBox = movieRateBox(movie);
  $movieRateContainer.append($movieRateBox);

  return $movieRateContainer;
};

export default movieRateContainer;
