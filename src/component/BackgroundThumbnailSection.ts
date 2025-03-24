import { MovieItemType } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";

const BackgroundThumbnailSection = (movie: MovieItemType) => {
  return createDOMElement({
    tag: "div",
    className: "background-container",
    children: [
      createDOMElement({
        tag: "div",
        className: "background-thumbnail-wrapper loading",
        children: [
          createDOMElement({
            tag: "img",
            className: "background-thumbnail",
            src: `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.backdrop_path}`,
            alt: movie.title,
            onload: function () {
              this.parentElement?.classList.remove("loading");
            },
          }),
        ],
      }),
      createDOMElement({
        tag: "div",
        className: "overlay",
        "aria-hidden": "true",
      }),
      createDOMElement({
        tag: "div",
        className: "top-rated-container",
        children: createDOMElement({
          tag: "div",
          className: "top-rated-movie",
          children: [
            createDOMElement({
              tag: "div",
              className: "rate",
              children: [
                createDOMElement({
                  tag: "img",
                  className: "star",
                  src: "./images/star_empty.png",
                }),
                createDOMElement({
                  tag: "span",
                  className: "rate-value",
                  textContent: movie.vote_average,
                }),
              ],
            }),
            createDOMElement({
              tag: "div",
              className: "title",
              textContent: movie.title,
            }),
            createDOMElement({
              tag: "button",
              className: "primary detail",
              textContent: "자세히 보기",
            }),
          ],
        }),
      }),
    ],
  });
};

export default BackgroundThumbnailSection;
