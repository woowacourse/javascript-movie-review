import { createElementWithAttributes } from "../../../../../../../../utils/createElementWithAttributes";
import { getComment } from "./internal/comment";

const movieRateComments = (myMovieRate: number) => {
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
