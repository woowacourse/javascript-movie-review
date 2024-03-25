import "./style.css";

import createElement from "../../utils/createElement";
import starFills from "./star_filled.png";

export interface MovieInfo {
  title: string;
  imgSrc: string;
  rating: number;
}

const createMoviePoster = ({ title, imgSrc, rating }: MovieInfo) => {
  const moviePosterLi = createElement({ tagName: "li" });
  const anchor = createElement({ tagName: "a" });
  const itemCardDiv = createElement({
    tagName: "div",
    attrs: { class: "item-card" },
  });

  const itemThumbnail = createElement({
    tagName: "img",
    attrs: {
      class: "item-thumbnail",
      src: imgSrc,
      loading: "lazy",
      alt: title,
    },
  });

  const titleParagraph = createElement({
    tagName: "p",
    contents: title,
    attrs: { class: "item-title" },
  });
  const scoreParagraph = createElement({
    tagName: "p",
    attrs: { class: " item-score" },
  });
  const starImg = createElement({
    tagName: "img",
    attrs: {
      src: starFills,
      alt: "별점",
    },
  });

  scoreParagraph.append(starImg, rating.toFixed(1));
  itemCardDiv.append(itemThumbnail, titleParagraph, scoreParagraph);
  anchor.append(itemCardDiv);
  moviePosterLi.append(anchor);

  return moviePosterLi;
};

export default createMoviePoster;
