import "./style.css";

import createElement from "../../utils/createElement";
import starFills from "./star_filled.png";

export interface MovieInfo {
  title: string;
  imgSrc: string;
  rating: number;
}

const createMoviePoster = ({ title, imgSrc, rating }: MovieInfo) => {
  const li = createElement("li");
  const anchor = createElement("a");
  const div = createElement("div", { class: "item-card" });
  const posterImg = createElement("img", {
    class: "item-thumbnail",
    src: imgSrc,
    loading: "lazy",
    alt: title,
  });
  const titleParagraph = createElement("p", { class: "item-title" }, title);
  const scoreParagraph = createElement("p", { class: " item-score" });
  const starImg = createElement("img", {
    src: starFills,
    alt: "별점",
  });

  scoreParagraph.append(starImg, rating.toString());
  div.append(posterImg, titleParagraph, scoreParagraph);
  anchor.append(div);
  li.append(anchor);

  return li;
};

export default createMoviePoster;
