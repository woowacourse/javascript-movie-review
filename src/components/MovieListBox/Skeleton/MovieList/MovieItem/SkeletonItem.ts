const $SkeletonItem = () => {
  const $skeletonItem = createElement("li", {
    className: "skeleton-item",
  });
  const $skeletonPoster = createElement("div", {
    className: "skeleton-poster",
  });
  const $skeletonDescription = createElement("div", {
    className: "skeleton-description",
  });

  $skeletonItem.append($skeletonPoster, $skeletonDescription);
  return $skeletonItem;
};

export default $SkeletonItem;
