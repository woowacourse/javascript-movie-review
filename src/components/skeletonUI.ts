import { createElementWithAttributes } from "./utils/createElementWithAttributes";

const skeletonUI = (count: number) => {
  const $skeletonContainer = createElementWithAttributes({
    tag: "section",
    className: "skeleton-container",
    children: [
      {
        tag: "h2",
        className: "skeleton skeleton-container-title",
      },
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

export default skeletonUI;
