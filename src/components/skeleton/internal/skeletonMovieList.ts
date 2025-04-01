import { createElementWithAttributes } from "../../utils/createElementWithAttributes";

const skeletonMovieList = (count: number) => {
  const $skeletonMovieList = createElementWithAttributes({
    tag: "ul",
    className: "skeleton-thumbnail-list",
    children: Array.from({ length: count }, () => ({
      tag: "li",
      className: "skeleton-movie",
      children: [
        {
          tag: "div",
          className: "skeleton skeleton-thumbnail",
        },
        {
          tag: "div",
          className: "skeleton skeleton-desc",
        },
      ],
    })),
  });
  return $skeletonMovieList;
};

export default skeletonMovieList;
