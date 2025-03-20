import "./skeleton.css";

function Skeleton() {
  const $skeletonContainer = document.createElement("li");
  $skeletonContainer.classList.add("skeletonContainer");

  const $skeletonItem = document.createElement("div");
  $skeletonItem.classList.add("skeletonItem");

  const $imageSkeleton = document.createElement("div");
  $imageSkeleton.classList.add("skeleton-image");

  const $captionSkeleton = document.createElement("div");
  $captionSkeleton.classList.add("skeleton-caption");

  $skeletonItem.appendChild($imageSkeleton);
  $skeletonItem.appendChild($captionSkeleton);
  $skeletonContainer.appendChild($skeletonItem);
  return $skeletonContainer;
}

export default Skeleton;
