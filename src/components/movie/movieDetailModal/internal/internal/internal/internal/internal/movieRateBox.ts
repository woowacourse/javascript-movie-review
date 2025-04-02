import moviesRatingLocalStorage from "../../../../../../../../domain/localStorage/moviesRatingLocalStorage";
import { MovieDetail } from "../../../../../../../../domain/types";
import { createElementWithAttributes } from "../../../../../../../utils/createElementWithAttributes";
import { Rate } from "./internal/internal/comment";
import movieRateComments from "./internal/movieRateComments";
import movieRateStars from "./internal/movieRateStars";

export type MyMovieRate = Rate | 0;

export interface MyMovieRates {
  [key: string]: MyMovieRate;
}

const movieRateBox = (movie: MovieDetail) => {
  const $movieRateBox = createElementWithAttributes({
    tag: "div",
    className: "movie-rate-box",
  });

  const myMovieRates: MyMovieRates =
    moviesRatingLocalStorage.getData<MyMovieRates>() ?? {};
  const myMovieRate = myMovieRates[movie.id] || 0;

  const $movieRateStars = movieRateStars({ myMovieRate, movie, $movieRateBox });

  const $movieRateComments = movieRateComments(myMovieRate);

  $movieRateBox.append($movieRateStars, $movieRateComments);

  return $movieRateBox;
};

export default movieRateBox;
