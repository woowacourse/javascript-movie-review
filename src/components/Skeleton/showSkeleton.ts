import Skeleton from "./Skeleton";

export function showSkeleton(count = 20, parentSelector = "section") {
  const $parent = document.querySelector(parentSelector);

  let $listContainer = $parent?.querySelector(".skeleton-list") as HTMLElement;

  if (!$listContainer) {
    $listContainer = document.createElement("ul");
    $listContainer.classList.add("thumbnail-list", "skeleton-list");
    $parent?.appendChild($listContainer);
  } else {
    $listContainer.innerHTML = "";
  }

  for (let i = 0; i < count; i++) {
    const $skeletonItem = Skeleton();
    $listContainer.appendChild($skeletonItem);
  }

  return $listContainer;
}

export function hideSkeleton() {
  const $skeletonLists = document.querySelectorAll(".skeleton-list");
  $skeletonLists.forEach(($list) => {
    $list.remove();
  });
}
