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
        className: "empty-wrapper",
        children: [
          createDOMElement({
            tag: "img",
            src: "./images/empty_planet.svg",
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
