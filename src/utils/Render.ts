export const toggleNoThumbnail = (option: "show" | "hidden") => {
  const noThumbnail = document.querySelector(".no-thumbnail");
  if (option === "show") noThumbnail?.classList.remove("hidden");
  if (option === "hidden") noThumbnail?.classList.add("hidden");
};

export const toggleSkeletonList = (option: "show" | "hidden") => {
  const skeletonUlElement = document.querySelector(
    ".skeleton-list"
  ) as HTMLUListElement;
  if (option === "show") skeletonUlElement.style.display = "grid";
  if (option === "hidden") skeletonUlElement.style.display = "none";
};

export const toggleSeeMoreButton = (option: "show" | "hidden") => {
  const seeMoreButton = document.querySelector("#seeMore") as HTMLButtonElement;
  if (option === "show") seeMoreButton.classList.remove("hidden");
  if (option === "hidden") seeMoreButton.classList.add("hidden");
};
