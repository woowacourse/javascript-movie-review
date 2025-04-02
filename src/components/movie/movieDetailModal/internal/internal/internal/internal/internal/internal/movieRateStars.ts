import moviesRatingLocalStorage from "../../../../../../../../../domain/localStorage/moviesRatingLocalStorage";
import { createElementWithAttributes } from "../../../../../../../../utils/createElementWithAttributes";
import starRatingElements from "./internal/starRatingElements";
import { MovieDetail } from "../../../../../../../../../domain/types";
import emptyStar from "/images/star_empty.png";
import filledStar from "/images/star_filled.png";
import { getComment, isScore } from "./internal/comment";

import { MyMovieRates } from "../movieRateBox";

interface HandleMovieRateUpdateParams {
  movie: MovieDetail;
  $movieRateStars: HTMLElement;
  $movieRateBox: HTMLElement;
}

interface MovieRateStarsProps {
  myMovieRate: number;
  movie: MovieDetail;
  $movieRateBox: HTMLElement;
}

const handleMovieRateUpdate = ({
  movie,
  $movieRateStars,
  $movieRateBox,
}: HandleMovieRateUpdateParams) => {
  return (event: MouseEvent): void => {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const myMovieRates: MyMovieRates =
      moviesRatingLocalStorage.getData<MyMovieRates>() ?? {};
    const myMovieRate = myMovieRates[movie.id] || 0;

    const newMovieRate = Number.parseInt(event.target.value, 10);
    if (myMovieRate === newMovieRate) {
      return;
    }

    if (isScore(newMovieRate) === false) {
      return;
    }

    const newMovieRates = { ...myMovieRates, [movie.id]: newMovieRate };
    moviesRatingLocalStorage.setData(newMovieRates);

    const $images = $movieRateStars.querySelectorAll(".star");
    $images.forEach(($img, idx) => {
      $img.setAttribute(
        "src",
        newMovieRate >= (idx + 1) * 2 ? filledStar : emptyStar
      );
    });

    const $movieRateComments = $movieRateBox.querySelector(
      "#movie-rate-comments"
    );

    if (!$movieRateComments) {
      return;
    }

    $movieRateComments.textContent = `${getComment(
      newMovieRate
    )} (${newMovieRate}/10)`;
  };
};

const movieRateStars = ({
  myMovieRate,
  movie,
  $movieRateBox,
}: MovieRateStarsProps) => {
  const $movieRateStars = createElementWithAttributes({
    tag: "div",
    className: "movie-rate-stars",
  });

  $movieRateStars.append(starRatingElements(myMovieRate));

  const updateMovieRate = handleMovieRateUpdate({
    movie,
    $movieRateStars,
    $movieRateBox,
  });

  $movieRateStars.addEventListener("click", updateMovieRate);

  return $movieRateStars;
};

export default movieRateStars;
