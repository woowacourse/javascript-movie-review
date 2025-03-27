import { MovieItemType } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";
import defaultImage from "../../public/images/default_poster_image.png";

const DetailModal = (movieItem: MovieItemType) => {
  return createDOMElement({
    tag: "dialog",
    className: "detail-modal-container",
    children: [
      createDOMElement({
        tag: "div",
        className: "modal",
        children: [
          createDOMElement({
            tag: "form",
            method: "dialog",
            children: [
              createDOMElement({
                tag: "button",
                className: "close-modal",
                id: "closeModal",
                children: [
                  createDOMElement({
                    tag: "img",
                    src: "./images/modal_button_close.png",
                  }),
                ],
              }),
            ],
          }),
          createDOMElement({
            tag: "div",
            className: "modal-container",
            children: [
              // Left Image
              createDOMElement({
                tag: "div",
                className: "modal-image loading",
                children: [
                  createDOMElement({
                    tag: "img",
                    src: movieItem.poster_path
                      ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movieItem.poster_path}`
                      : defaultImage,
                    alt: movieItem.title,
                    onload: function () {
                      this.parentElement?.classList.remove("loading");
                    },
                  }),
                ],
              }),
              // Right Description
              createDOMElement({
                tag: "div",
                className: "modal-description",
                children: [
                  // 첫 번째 섹션
                  createDOMElement({
                    tag: "div",
                    className: "description-section description-first-section",
                    children: [
                      createDOMElement({
                        tag: "h2",
                        className: "movie-title",
                        textContent: movieItem.title,
                      }),
                      createDOMElement({
                        tag: "p",
                        className: "category",
                        textContent: "2024 · 모험, 애니메이션, 코미디, 드라마, 가족",
                      }),
                      createDOMElement({
                        tag: "div",
                        className: "rate",
                        children: [
                          createDOMElement({
                            tag: "span",
                            className: "average",
                            textContent: "평균",
                          }),
                          createDOMElement({
                            tag: "div",
                            className: "rate-star",
                            children: [
                              createDOMElement({
                                tag: "img",
                                className: "star",
                                src: "./images/star_filled.png",
                              }),
                              createDOMElement({
                                tag: "span",
                                className: "star-description",
                                textContent: movieItem.vote_average,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  // 두 번째 섹션 (내 별점)
                  createDOMElement({
                    tag: "div",
                    className: "description-section description-second-section",
                    children: [
                      createDOMElement({
                        tag: "span",
                        className: "description-title",
                        textContent: "내 별점",
                      }),
                      createDOMElement({
                        tag: "div",
                        className: "my-star",
                        children: [
                          createDOMElement({
                            tag: "div",
                            className: "star-wrapper",
                            children: Array.from({ length: 5 }, () =>
                              createDOMElement({
                                tag: "img",
                                src: "./images/star-empty.png",
                              }),
                            ),
                          }),
                          createDOMElement({
                            tag: "span",
                            className: "star-description",
                            children: [
                              createDOMElement({
                                tag: "span",
                                textContent: "명작이에요 ",
                              }),
                              createDOMElement({
                                tag: "span",
                                className: "star-number",
                                textContent: "(8/10)",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  // 세 번째 섹션 (줄거리)
                  createDOMElement({
                    tag: "div",
                    className: "description-section description-third-section",
                    children: [
                      createDOMElement({
                        tag: "span",
                        className: "description-title",
                        textContent: "줄거리",
                      }),
                      createDOMElement({
                        tag: "p",
                        className: "detail",
                        textContent: movieItem.overview ? movieItem.overview : "줄거리가 없습니다.",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default DetailModal;
