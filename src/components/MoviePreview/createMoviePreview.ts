import "./style.css";

import MovieThumbnail from "../MovieThumbnail/createMovieThumbnail";
import createElement from "../../utils/createElement";
import starFills from "./star_filled.png";

export interface MovieInfo {
  title: string;
  imgSrc: string;
  rating: number;
  id: string;
}

class MoviePreview {
  element = createElement("li");
  #thumbnail;

  constructor({ title, imgSrc, rating }: MovieInfo) {
    this.#thumbnail = new MovieThumbnail(imgSrc, title);

    const anchor = createElement("a");
    const div = createElement("div", { attrs: { class: "item-card" } });
    const titleParagraph = createElement("p", {
      attrs: { class: "item-title" },
      content: title,
    });
    const scoreParagraph = createElement("p", {
      attrs: { class: " item-score" },
    });
    const starImg = createElement("img", {
      attrs: {
        src: starFills,
        alt: "별점",
      },
    });

    scoreParagraph.append(starImg, rating.toFixed(1));
    div.append(this.#thumbnail.element, titleParagraph, scoreParagraph);
    anchor.append(div);
    this.element.append(anchor);
  }
}

export default MoviePreview;
