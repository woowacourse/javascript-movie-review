import { IMovieItem } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";

const MovieItem = (movie: IMovieItem) => {
  return createDOMElement({
    tag: "li",
    children: [
      createDOMElement({
        tag: "div",
        class: "item",
        children: [
          createDOMElement({
            tag: "img",
            class: "thumbnail",
            src: `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`,
            alt: movie.title,
          }),
          createDOMElement({
            tag: "div",
            class: "item-desc",
            children: [
              createDOMElement({
                tag: "p",
                class: "rate",
                children: [
                  createDOMElement({
                    tag: "img",
                    class: "star",
                    src: "./images/star_empty.png",
                  }),
                  createDOMElement({
                    tag: "span",
                    textContent: movie.vote_average,
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
