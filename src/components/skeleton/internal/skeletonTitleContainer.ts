import { createElementWithAttributes } from "../../utils/createElementWithAttributes";

const skeletonContainerTitle = () => {
  return createElementWithAttributes({
    tag: "p",
    className: "skeleton-container-title-box",
    children: [
      {
        tag: "h2",
        className: "skeleton skeleton-container-title",
      },
    ],
  });
};

export default skeletonContainerTitle;
