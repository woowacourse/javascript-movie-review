import "./style.css";

import createElement from "../../utils/createElement";
import starFills from "./star_filled.png";

export interface MovieInfo {
  id: number;
  title: string;
  imgSrc: string;
  rating: number;
}

const createMoviePoster = ({ id, title, imgSrc, rating }: MovieInfo) => {
  const moviePosterLi = createElement({
    tagName: "li",
  });
  const itemCardDiv = createElement({
    tagName: "div",
    attrs: { class: "item-card", "data-movie-id": id.toString() }, // movieId 값을 이용하여 영화 상세 정보 조회
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
  const ratingTag = createElement({
    tagName: "p",
    contents: rating.toFixed(1),
  });

  scoreParagraph.append(starImg, ratingTag);
  itemCardDiv.append(itemThumbnail, titleParagraph, scoreParagraph);
  moviePosterLi.append(itemCardDiv);

  return moviePosterLi;
};

export default createMoviePoster;
