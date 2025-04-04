import createDOMElement from "../../util/createDomElement";

interface TopRatedMoviePreviewProps {
  title: string;
  voteAverage: number;
}

const TopRatedMoviePreview = ({ title, voteAverage }: TopRatedMoviePreviewProps) => {
  return createDOMElement({
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
              textContent: voteAverage.toFixed(2),
            }),
          ],
        }),
        createDOMElement({
          tag: "div",
          class: "title",
          textContent: title,
        }),
        createDOMElement({
          tag: "button",
          class: "primary detail",
          textContent: "자세히 보기",
        }),
      ],
    }),
  });
};

export default TopRatedMoviePreview;
