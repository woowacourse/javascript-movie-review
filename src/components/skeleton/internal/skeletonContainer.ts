import { createElementWithAttributes } from "../../utils/createElementWithAttributes";
import skeletonMovieList from "./skeletonMovieList";

const skeletonContainer = (count: number) => {
  const $skeletonContainer = createElementWithAttributes({
    tag: "section",
    className: "skeleton-container",
  });
  $skeletonContainer.append(skeletonMovieList(count));

  return $skeletonContainer;
};

export default skeletonContainer;
