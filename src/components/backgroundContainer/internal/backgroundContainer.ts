import { createElementWithAttributes } from "../../utils/createElementWithAttributes";

const backgroundContainer = () => {
  const $backgroundContainer = createElementWithAttributes({
    tag: "div",
    className: "background-container",
    children: [
      {
        tag: "div",
        className: "overlay overlay-background",
        attributes: {
          "aria-hidden": "true",
        },
      },
      {
        tag: "img",
        className: "overlay overlay-image",
        attributes: {
          src: "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
          alt: "배너 이미지",
        },
      },

      {
        tag: "div",
        className: "top-rated-container",
        children: [
          {
            tag: "div",
            className: "top-rated-movie",
            children: [
              {
                tag: "div",
                className: "rate",
                children: [
                  {
                    tag: "img",
                    className: "star",
                    attributes: {
                      src: "./images/star_empty.png",
                    },
                  },
                  {
                    tag: "span",
                    className: "rate-value",
                    textContent: "9.5",
                  },
                ],
              },
              {
                tag: "div",
                className: "title",
                textContent: "인사이드 아웃2",
              },
              {
                tag: "button",
                className: "primary",
                textContent: "자세히 보기",
              },
            ],
          },
        ],
      },
    ],
  });

  return $backgroundContainer;
};
export default backgroundContainer;
