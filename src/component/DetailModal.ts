import { SCORE_RATING_TEXT } from "../constant/scoreRatingText";
import { IMovieDetail } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";

const DetailModal = (movieDetail: IMovieDetail) => {
  const starButtons = Array.from({ length: 5 }, (_, index) =>
    createDOMElement({
      tag: "img",
      id: `starButton${index}`,
      src: "./images/star_empty.png",
      class: "modal-star-button",
    }),
  );
  starButtons.forEach((btn, i) => {
    const img = btn as HTMLImageElement;
    img.src = i < movieDetail.starScore / 2 ? "./images/star_filled.png" : "./images/star_empty.png";
  });

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
                  tag: "div",
                  class: "modal-description-title",
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
                  ],
                }),
                createDOMElement({
                  tag: "hr",
                }),
                createDOMElement({
                  tag: "div",
                  class: "modal-star-wrapper",
                  children: [
                    createDOMElement({
                      tag: "h3",
                      class: "modal-star-title",
                      textContent: "내 별점",
                    }),
                    createDOMElement({
                      tag: "div",
                      class: "modal-star-box",
                      children: [
                        createDOMElement({
                          tag: "div",
                          class: "modal-star-button-wrapper",
                          children: starButtons,
                        }),
                        createDOMElement({
                          tag: "span",
                          class: "modal-star-text",
                          textContent: SCORE_RATING_TEXT[movieDetail.starScore],
                          children: [
                            movieDetail.starScore > 0
                              ? createDOMElement({
                                  tag: "span",
                                  class: "modal-star-score",
                                  textContent: ` (${movieDetail.starScore}/10)`,
                                })
                              : null,
                          ],
                        }),
                      ],
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
