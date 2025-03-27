import { MovieDetail } from "../../domain/types";
import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import noImage from "/images/no_image.png";

const movieDetailInfo = (movie: MovieDetail) => {
  const $movieDetailInfo = createElementWithAttributes({
    tag: "div",
    className: "modal-container",
    children: [
      {
        tag: "div",
        className: "modal-image",
        children: [
          {
            tag: "img",
            attributes: {
              src:
                movie.poster_path === null
                  ? noImage
                  : `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`,
            },
          },
        ],
      },
      {
        tag: "div",
        className: "modal-description",
        children: [
          { tag: "h2", textContent: movie.title },
          {
            tag: "p",
            className: "category",
            textContent: movie.genres.map((genre) => genre.name).join(", "),
          },
          {
            tag: "p",
            className: "rate",
            children: [
              {
                tag: "img",
                className: "star",
                attributes: { src: "./images/star_filled.png" },
                children: [
                  { tag: "span", textContent: movie.vote_average.toString() },
                ],
              },
            ],
          },
          { tag: "hr" },
          { tag: "p", className: "detail", textContent: movie.overview },
        ],
      },
    ],
  });

  return $movieDetailInfo;
};

export default movieDetailInfo;
