import { MyMovieRate } from "../../movieRateBox";
import { getComment } from "./comment";

interface UpdateMovieRateCommentsProps {
  $movieRateBox: HTMLElement;
  newMovieRate: MyMovieRate;
}

const updateMovieRateComments = ({
  $movieRateBox,
  newMovieRate,
}: UpdateMovieRateCommentsProps) => {
  const $movieRateComments = $movieRateBox.querySelector(
    "#movie-rate-comments"
  );

  if (!$movieRateComments) {
    return;
  }

  if (newMovieRate === 0) {
    return;
  }

  $movieRateComments.textContent = `${getComment(
    newMovieRate
  )} (${newMovieRate}/10)`;
};

export default updateMovieRateComments;
