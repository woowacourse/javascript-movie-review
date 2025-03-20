import { createElementWithAttributes } from "../utils/createElementWithAttributes";

const skeletonContainerTitle = () => {
  return createElementWithAttributes({
    tag: "h2",
    className: "skeleton skeleton-container-title",
  });
};

export default skeletonContainerTitle;
