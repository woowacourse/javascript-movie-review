import { createElementWithAttributes } from "../utils/createElementWithAttributes";

const skeletonContainer = (count: number) => {
  const $skeletonContainer = createElementWithAttributes({
    tag: "section",
    className: "skeleton-container",
    children: [
      {
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
      },
    ],
  });

  return $skeletonContainer;
};

export default skeletonContainer;
