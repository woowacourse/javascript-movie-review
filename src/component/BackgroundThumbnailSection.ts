import { MovieItemType } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";

const BackgroundThumbnailSection = (movie: MovieItemType) => {
  return createDOMElement({
    tag: "div",
    class: "background-container",
    children: [
      createDOMElement({
        tag: "img",
        class: "background-thumbnail",
        src: `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.backdrop_path}`,
      }),
      createDOMElement({
        tag: "div",
        class: "overlay",
        "aria-hidden": "true",
      }),
      createDOMElement({
        tag: "div",
        class: "top-rated-container",
        children: createDOMElement({
          tag: "div",
          class: "top-rated-movie",
          children: [
            createDOMElement({
              tag: "div",
              class: "rate",
              children: [
                createDOMElement({
                  tag: "img",
                  class: "star",
                  src: "./images/star_empty.png",
                }),
                createDOMElement({
                  tag: "span",
                  class: "rate-value",
                  textContent: movie.vote_average,
                }),
              ],
            }),
            createDOMElement({
              tag: "div",
              class: "title",
              textContent: movie.title,
            }),
            createDOMElement({
              tag: "button",
              class: "primary detail",
              textContent: "자세히 보기",
            }),
          ],
        }),
      }),
    ],
  });
};

export default BackgroundThumbnailSection;
