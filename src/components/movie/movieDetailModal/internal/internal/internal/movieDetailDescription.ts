import { MovieDetail } from "../../../../../../domain/types";
import { createElementWithAttributes } from "../../../../../utils/createElementWithAttributes";
import myMovieRating from "./internal/myMovieRating";

const movieDetailOverview = (movie: MovieDetail) => {
  const $movieDetailOverview = createElementWithAttributes({
    tag: "div",
    className: "movie-detail-overview",
    children: [
      { tag: "hr" },
      { tag: "h3", textContent: "줄거리" },
      {
        tag: "p",
        className: "detail",
        textContent: movie.overview || "줄거리가 없습니다.",
      },
    ],
  });
  return $movieDetailOverview;
};

const movieDetailDescription = (movie: MovieDetail) => {
  const $movieDetailDescription = createElementWithAttributes({
    tag: "div",
    className: "modal-description",
    children: [
      {
        tag: "div",
        className: "modal-description-header",
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
      },
    ],
  });

  $movieDetailDescription.append(
    myMovieRating(movie),
    movieDetailOverview(movie)
  );

  return $movieDetailDescription;
};

export default movieDetailDescription;
