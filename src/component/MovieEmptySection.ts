import createDOMElement from "../util/createDomElement";

const MovieEmptySection = (title: string) => {
  return createDOMElement({
    tag: "section",
    children: [
      createDOMElement({
        tag: "h2",
        textContent: title,
      }),
      createDOMElement({
        tag: "div",
        class: "empty-wrapper",
        children: [
          createDOMElement({
            tag: "img",
            src: "./images/empty_planet.png",
          }),
          createDOMElement({
            tag: "h2",
            textContent: "검색 결과가 없습니다.",
          }),
        ],
      }),
    ],
  });
};

export default MovieEmptySection;
