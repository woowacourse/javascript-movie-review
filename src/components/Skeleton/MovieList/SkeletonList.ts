import $SkeletonItem from "./MovieItem/SkeletonItem";

export const replaceSkeletonList = () => {
  const $movieListSection = document.querySelector(
    ".movie-list-section"
  ) as HTMLElement;
  $movieListSection.replaceChildren($SkeletonList());
};

export const addSkeletonItems = () => {
  const $thumbnailList = document.querySelector(".thumbnail-list");
  if (!$thumbnailList) return;
  const $skeletonList = Array.from({ length: 20 }, () => $SkeletonItem());
  $thumbnailList.append(...$skeletonList);
};

export const removeSkeletonItems = () => {
  const $skeletonItems = document.querySelectorAll(".skeleton-item");
  $skeletonItems.forEach((item) => {
    item.remove();
  });
};

const $SkeletonList = () => {
  const $skeletonList = createElement("ul", { className: "skeleton-list" });
  $skeletonList.append(...Array.from({ length: 20 }, () => $SkeletonItem()));
  return $skeletonList;
};

export default $SkeletonList;
