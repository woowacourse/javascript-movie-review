import { MOVIE_COUNT_PER_PAGE } from "../constant/constant.js";

const createSkeletonData = Array(MOVIE_COUNT_PER_PAGE).fill({
    poster_path: null,
    title: null,
    vote_average: null,
  });

export default createSkeletonData