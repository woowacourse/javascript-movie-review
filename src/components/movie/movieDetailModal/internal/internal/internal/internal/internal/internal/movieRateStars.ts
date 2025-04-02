import moviesRatingLocalStorage from "../../../../../../../../../domain/localStorage/moviesRatingLocalStorage";
import { createElementWithAttributes } from "../../../../../../../../utils/createElementWithAttributes";
import starRatingElements from "./internal/starRatingElements";
import { MovieDetail } from "../../../../../../../../../domain/types";
import { isScore } from "./internal/comment";
import { MyMovieRate, MyMovieRates } from "../movieRateBox";
import updateMovieRateComments from "./internal/updateMovieRateComments";
import updateMovieRateStars from "./internal/updateMovieRateStars";

interface HandleMovieRateUpdateParams {
  movie: MovieDetail;
  $movieRateStars: HTMLElement;
  $movieRateBox: HTMLElement;
}

interface MovieRateStarsProps {
  myMovieRate: MyMovieRate;
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

    updateMovieRateStars({
      myMovieRates,
      movie,
      newMovieRate,
      $movieRateStars,
    });

    updateMovieRateComments({ $movieRateBox, newMovieRate });
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
