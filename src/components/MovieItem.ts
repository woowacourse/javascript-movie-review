import { MovieItemType } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";
import defaultImage from "../../public/images/default_poster_image.png";

const MovieItem = (movie: MovieItemType) => {
  return createDOMElement({
    tag: "li",
    children: [
      createDOMElement({
        tag: "div",
        className: "item",
        id: movie.id,
        children: [
          createDOMElement({
            tag: "div",
            className: "thumbnail-wrapper loading",
            children: [
              createDOMElement({
                tag: "img",
                className: "thumbnail",
                src: movie.poster_path
                  ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
                  : defaultImage,
                alt: movie.title,
                onload: function () {
                  this.parentElement?.classList.remove("loading");
                },
              }),
            ],
          }),

          createDOMElement({
            tag: "div",
            className: "item-desc",
            children: [
              createDOMElement({
                tag: "p",
                className: "rate",
                children: [
                  createDOMElement({
                    tag: "img",
                    className: "star",
                    src: "./images/star_empty.png",
                  }),
                  createDOMElement({
                    tag: "span",
                    textContent: Number(movie.vote_average).toFixed(2),
                  }),
                ],
              }),
              createDOMElement({
                tag: "strong",
                textContent: movie.title,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default MovieItem;
