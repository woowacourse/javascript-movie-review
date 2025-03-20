import $SkeletonItem from "./MovieItem/SkeletonItem";

export const replaceSkeletonList = () => {
  const $movieListSection = document.querySelector(
    ".movie-list-section"
  ) as HTMLElement;
  $movieListSection.replaceChildren($SkeletonList());
};

export const addSkeletonList = () => {
  const $movieListSection = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement;
  $movieListSection.appendChild($SkeletonList());
};

export const removeSkeletonList = () => {
  const $skeletonList = document.querySelector(".skeleton-list");
  $skeletonList?.remove();
};

const $SkeletonList = () => {
  const $skeletonList = createElement("ul", { className: "skeleton-list" });
  $skeletonList.append(...Array.from({ length: 20 }, () => $SkeletonItem()));
  return $skeletonList;
};

export default $SkeletonList;
