import createElement from "../../../utils/createElement";

const generateSkeletonMovieItem = () => {
  const $skeletonThumbnail = generateSkeletonDiv("item-thumbnail");
  const $skeletonTitle = generateSkeletonDiv("item-title");
  const $skeletonScore = generateSkeletonDiv("item-score");

  const $div = createElement({
    tagName: "div",
    attribute: {
      class: "item-card",
    },
    children: [$skeletonThumbnail, $skeletonTitle, $skeletonScore],
  });

  return $div;
};

const generateSkeletonDiv = (className: string) => {
  return createElement({
    tagName: "div",
    attribute: { class: `${className} skeleton` },
  });
};
