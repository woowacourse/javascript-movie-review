import createDOMElement from "../util/createDomElement";

const MovieItem = () => {
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
            src: "https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg",
            alt: "인사이드 아웃 2",
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
                    textContent: "7.7",
                  }),
                ],
              }),
              createDOMElement({
                tag: "strong",
                textContent: "인사이드 아웃 2",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default MovieItem;
