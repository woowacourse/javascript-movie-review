import { createElementWithAttributes } from "../../utils/createElementWithAttributes";
import { Movie } from "../../../domain/types";
import noImage from "/images/no_image.png";

const movieItem = (movie: Movie) => {
  const $movieItem = createElementWithAttributes({
    tag: "li",
    id: movie.id.toString(),
    className: "item",
    children: [
      {
        tag: "img",
        className: "thumbnail",
        attributes: {
          src:
            movie.poster_path === null
              ? noImage
              : `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`,
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
                  src: `./images/star_empty.png`,
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
