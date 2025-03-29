import { MovieDetail } from "../../../../../../domain/types";
import { createElementWithAttributes } from "../../../../../utils/createElementWithAttributes";
import myMovieRating from "./internal/myMovieRating";

const movieDetailOverview = (movie: MovieDetail) => {
  const $fragment = document.createDocumentFragment();
  const $hr = createElementWithAttributes({ tag: "hr" });
  const $overview = createElementWithAttributes({
    tag: "h3",
    textContent: "줄거리",
  });
  const $detailOverview = createElementWithAttributes({
    tag: "p",
    className: "detail",
    textContent: movie.overview,
  });

  $fragment.append($hr, $overview, $detailOverview);
  return $fragment;
};

const movieDetailDescription = (movie: MovieDetail) => {
  const $movieDetailDescription = createElementWithAttributes({
    tag: "div",
    className: "modal-description",
    children: [
      { tag: "h2", textContent: movie.title },
      {
        tag: "p",
        className: "category",
        textContent: `${new Date(
          movie.release_date
        ).getFullYear()} · ${movie.genres
          .map((genre) => genre.name)
          .join(", ")}`,
      },
      {
        tag: "p",
        className: "rate",
        children: [
          {
            tag: "span",
            textContent: `평균`,
          },
          {
            tag: "p",
            className: "average-rate-container",
            children: [
              {
                tag: "img",
                className: "star",
                attributes: { src: "./images/star_filled.png" },
              },
              {
                tag: "span",
                textContent: `${movie.vote_average.toFixed(1).toString()}`,
              },
            ],
          },
        ],
      },
      { tag: "hr" },
    ],
  });

  $movieDetailDescription.append(
    myMovieRating(movie),
    movieDetailOverview(movie)
  );

  return $movieDetailDescription;
};

export default movieDetailDescription;
