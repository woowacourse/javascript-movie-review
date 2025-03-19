export function showSkeleton() {
  const skeleton = document.querySelector(".skeleton-list");
  if (skeleton) skeleton.classList.remove("hide");
}

export function hideSkeleton() {
  const skeleton = document.querySelector(".skeleton-list");
  if (skeleton) skeleton.classList.add("hide");
}
