export function showSkeleton() {
  const skeleton = document.querySelector("#skeleton-list");
  if (skeleton) skeleton.classList.remove("hide");
  if (skeleton) skeleton.classList.add("show");
}

export function hideSkeleton() {
  const skeleton = document.querySelector("#skeleton-list");
  if (skeleton) skeleton.classList.add("hide");
  if (skeleton) skeleton.classList.remove("show");
}
