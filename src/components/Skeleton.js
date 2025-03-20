import MovieItem from "./MovieItem";
function Skeleton() {
  // const movieItem = MovieItem();
  const $skeletonContainer = document.createElement("div");
  $skeletonContainer.classList.add("skeletonContainer");
  const $skeletonItem = document.createElement("div");
  $skeletonItem.classList.add("skeletonItem");

  const $image = document.querySelector(".thumbnail");
  const $caption = document.querySelector(".item-desc");
  console.log($image);
  $skeletonItem.appendChild($image);
  $skeletonItem.appendChild($caption);

  $skeletonContainer.appendChild($skeletonItem);
  return $skeletonContainer;
}

export default Skeleton;
