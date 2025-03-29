import moviesRatingLocalStorage from "../../../../../../../domain/localStorage/moviesRatingLocalStorage";
import { MovieDetail } from "../../../../../../../domain/types";
import { createElementWithAttributes } from "../../../../../../utils/createElementWithAttributes";
import emptyStar from "/images/star_empty.png";
import filledStar from "/images/star_filled.png";

const COMMENTS: { [key: number]: string } = {
  2: "최악이예요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
};

interface MyMovieRates {
  [key: string]: number;
}

const movieRateBox = (movie: MovieDetail) => {
  const $movieRateBox = createElementWithAttributes({
    tag: "div",
    className: "movie-rate-box",
  });

  const $movieRateStars = createElementWithAttributes({
    tag: "div",
    className: "movie-rate-stars",
  });

  const myMovieRates: MyMovieRates =
    moviesRatingLocalStorage.getDataFromLocalStorage<MyMovieRates>() ?? {};
  const myMovieRate = myMovieRates[movie.id] || 0;

  Object.keys(COMMENTS).forEach((score, idx) => {
    const commonId = `rate-check-${idx}`;
    const $label = createElementWithAttributes({
      tag: "label",
      attributes: { for: commonId },
      children: [
        {
          tag: "img",
          id: `rate-img-${idx}`,
          className: "star",
          attributes: {
            src:
              myMovieRate >= Number.parseInt(score, 10)
                ? filledStar
                : emptyStar,
            alt: `${score}점`,
          },
        },
      ],
    });

    const $input = createElementWithAttributes({
      tag: "input",
      id: commonId,
      className: "rate-check-input",
      attributes: {
        type: "radio",
        value: score,
        name: "rate",
      },
    });

    $movieRateStars.append($label, $input);
  });

  const $movieRateComments = createElementWithAttributes({
    tag: "div",
    id: "movie-rate-comments",
    className: "movie-rate-comments",
    textContent: `${
      myMovieRate === 0
        ? "별점을 남겨주세요."
        : `${COMMENTS[myMovieRate]} (${myMovieRate}/10)`
    }`,
  });

  $movieRateStars.addEventListener("click", (event) => {
    if (event.target instanceof HTMLInputElement === false) {
      return;
    }

    const myMovieRates: MyMovieRates =
      moviesRatingLocalStorage.getDataFromLocalStorage<MyMovieRates>() ?? {};
    const myMovieRate = myMovieRates[movie.id] || 0;

    const newMovieRate = Number.parseInt(event.target.value, 10);
    if (myMovieRate === newMovieRate) {
      return;
    }

    const newMovieRates = { ...myMovieRates, [movie.id]: newMovieRate };
    moviesRatingLocalStorage.setDataToLocalStorage(newMovieRates);

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
    $movieRateComments.textContent = `${COMMENTS[newMovieRate]} (${newMovieRate}/10)`;
  });

  $movieRateBox.append($movieRateStars, $movieRateComments);

  return $movieRateBox;
};

const myMovieRating = (movie: MovieDetail) => {
  const $myMovieRating = createElementWithAttributes({
    tag: "div",
    className: "movie-rate-container",
    children: [{ tag: "h3", textContent: "내 별점" }],
  });

  const $movieRateBox = movieRateBox(movie);
  $myMovieRating.append($movieRateBox);

  return $myMovieRating;
};

export default myMovieRating;
