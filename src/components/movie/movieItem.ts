import { ElementOptions } from "../utils/createElementWithAttributes";
import { Movie } from "./types";

const movieItem = (movie: Movie): ElementOptions => {
  return {
    tag: "li",
    className: "item",
    children: [
      {
        tag: "img",
        className: "thumbnail",
        attributes: {
          src: `https://image.tmdb.org/t/p/w440_and_h660_face${movie.poster_path}`,
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
                textContent: String(movie.vote_average),
              },
            ],
          },
          { tag: "strong", textContent: movie.title },
        ],
      },
    ],
  };
};

export default movieItem;
