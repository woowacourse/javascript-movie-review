import moviesRatingLocalStorage from "../../../../../../../../domain/localStorage/moviesRatingLocalStorage";
import { MovieDetail } from "../../../../../../../../domain/types";
import { createElementWithAttributes } from "../../../../../../../utils/createElementWithAttributes";
import movieRateComments from "./internal/movieRateComments";
import movieRateStars from "./internal/movieRateStars";

interface MyMovieRates {
  [key: string]: number;
}

const movieRateBox = (movie: MovieDetail) => {
  const $movieRateBox = createElementWithAttributes({
    tag: "div",
    className: "movie-rate-box",
  });

  const myMovieRates: MyMovieRates =
    moviesRatingLocalStorage.getDataFromLocalStorage<MyMovieRates>() ?? {};
  const myMovieRate = myMovieRates[movie.id] || 0;

  const $movieRateStars = movieRateStars(myMovieRate, movie, $movieRateBox);

  const $movieRateComments = movieRateComments(myMovieRate);

  $movieRateBox.append($movieRateStars, $movieRateComments);

  return $movieRateBox;
};

export default movieRateBox;
