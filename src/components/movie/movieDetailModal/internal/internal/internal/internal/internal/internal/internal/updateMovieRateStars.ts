import moviesRatingLocalStorage from "../../../../../../../../../../domain/localStorage/moviesRatingLocalStorage";
import { MovieDetail } from "../../../../../../../../../../domain/types";
import { MyMovieRates } from "../../movieRateBox";
import emptyStar from "/images/star_empty.png";
import filledStar from "/images/star_filled.png";

interface UpdateMovieRateStarsProps {
  myMovieRates: MyMovieRates;
  movie: MovieDetail;
  newMovieRate: number;
  $movieRateStars: HTMLElement;
}

const updateMovieRateStars = ({
  myMovieRates,
  movie,
  newMovieRate,
  $movieRateStars,
}: UpdateMovieRateStarsProps): void => {
  const newMovieRates = { ...myMovieRates, [movie.id]: newMovieRate };
  moviesRatingLocalStorage.setData(newMovieRates);

  const $images = $movieRateStars.querySelectorAll(".star");
  $images.forEach(($img, idx) => {
    $img.setAttribute(
      "src",
      newMovieRate >= (idx + 1) * 2 ? filledStar : emptyStar
    );
  });
};

export default updateMovieRateStars;
