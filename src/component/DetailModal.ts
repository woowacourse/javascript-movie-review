import { IMovieDetail } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";

const DetailModal = (movieDetail: IMovieDetail) => {
  return createDOMElement({
    tag: "div",
    class: "modal-background active",
    id: "modalBackground",
    children: createDOMElement({
      tag: "div",
      class: "modal",
      children: [
        createDOMElement({
          tag: "button",
          class: "close-modal",
          id: "closeModal",
          children: createDOMElement({
            tag: "img",
            src: "./images/modal_button_close.png",
          }),
        }),
        createDOMElement({
          tag: "div",
          class: "modal-container",
          children: [
            createDOMElement({
              tag: "div",
              class: "modal-image",
              children: createDOMElement({
                tag: "img",
                src: `https://image.tmdb.org/t/p/original${movieDetail.poster_path}`,
              }),
            }),
            createDOMElement({
              tag: "div",
              class: "modal-description",
              children: [
                createDOMElement({
                  tag: "h2",
                  textContent: movieDetail.title,
                }),
                createDOMElement({
                  tag: "p",
                  textContent: `${movieDetail.release_date.split("-")[0]} · ${movieDetail.genres.map((genre) => genre.name).join(", ")}`,
                }),
                createDOMElement({
                  tag: "p",
                  children: [
                    createDOMElement({
                      tag: "img",
                      src: "./images/star_filled.png",
                      class: "star",
                    }),
                    createDOMElement({
                      tag: "span",
                      textContent: movieDetail.vote_average,
                    }),
                  ],
                }),
                createDOMElement({
                  tag: "hr",
                }),
                createDOMElement({
                  tag: "p",
                  class: "detail",
                  textContent: movieDetail.overview,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};

export default DetailModal;
