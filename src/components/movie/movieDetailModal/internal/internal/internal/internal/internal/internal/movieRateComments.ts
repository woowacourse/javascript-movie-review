import { createElementWithAttributes } from "../../../../../../../../utils/createElementWithAttributes";
import { MyMovieRate } from "../movieRateBox";
import { getComment } from "./internal/comment";

const movieRateComments = (myMovieRate: MyMovieRate) => {
  return createElementWithAttributes({
    tag: "div",
    id: "movie-rate-comments",
    className: "movie-rate-comments",
    textContent: `${
      myMovieRate === 0
        ? "별점을 남겨주세요."
        : `${getComment(myMovieRate)} (${myMovieRate}/10)`
    }`,
  });
};
export default movieRateComments;
