import { createElementWithAttributes } from "../../../utils/createElementWithAttributes";
import { Movie } from "../../../../domain/types";
import noImage from "/images/no_image.png";
import placeholderImage from "/images/placeholder_poster.svg";
import filledStar from "/images/star_filled.png";
import emptyStar from "/images/star_empty.png";
import { MyMovieRates } from "../../movieDetailModal/internal/internal/internal/internal/internal/movieRateBox";
import moviesRatingLocalStorage from "../../../../domain/localStorage/moviesRatingLocalStorage";
import { $ } from "../../../utils/selectors";

const checkMovieItemRateStar = (movieId: number) => {
  const myMovieRates: MyMovieRates =
    moviesRatingLocalStorage.getData<MyMovieRates>() ?? {};
  const myMovieRate = myMovieRates[movieId] || 0;

  return myMovieRate > 0 ? filledStar : emptyStar;
};

export const updateMovieItemRateStar = (movieId: number) => {
  const $movieItem = document.getElementById(movieId.toString());

  if (!$movieItem) {
    return;
  }

  const $rate = $(".rate", $movieItem);
  if (!$rate) {
    return;
  }

  const $star = $(".star", $rate);
  if (!$star) {
    return;
  }

  $star.setAttribute("src", checkMovieItemRateStar(movieId));
};

const movieItem = (movie: Movie) => {
  const $movieItem = createElementWithAttributes({
    tag: "li",
    id: movie.id.toString(),
    className: "item",
    children: [
      {
        tag: "img",
        className: "thumbnail",
        onload: function () {
          if (this instanceof HTMLImageElement === false) {
            return;
          }

          this.src =
            movie.poster_path === null
              ? noImage
              : `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`;
        },
        attributes: {
          src: placeholderImage,
          alt: movie.title,
        },
      },
      {
        tag: "div",
        className: "item-desc",
        children: [
          {
            tag: "p",
            className: "rate",
            children: [
              {
                tag: "img",
                className: "star",
                attributes: {
                  src: checkMovieItemRateStar(movie.id),
                  alt: "별",
                },
              },
              {
                tag: "span",
                textContent: movie.vote_average.toFixed(1).toString(),
              },
            ],
          },
          { tag: "strong", textContent: movie.title },
        ],
      },
    ],
  });

  return $movieItem;
};

export default movieItem;
