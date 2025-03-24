import { selectElement } from "./dom.ts";

export const toggleNoThumbnail = (option: "show" | "hidden") => {
  const noThumbnail = selectElement<HTMLDivElement>(".no-thumbnail");
  if (option === "show") noThumbnail.classList.remove("hidden");
  if (option === "hidden") noThumbnail.classList.add("hidden");
};

export const toggleSkeletonList = (option: "show" | "hidden") => {
  const skeletonUlElement = selectElement<HTMLUListElement>(".skeleton-list");
  if (option === "show") skeletonUlElement.style.display = "grid";
  if (option === "hidden") skeletonUlElement.style.display = "none";
};

export const toggleSeeMoreButton = (option: "show" | "hidden") => {
  const seeMoreButton = selectElement<HTMLButtonElement>("#seeMore");
  if (option === "show") seeMoreButton.classList.remove("hidden");
  if (option === "hidden") seeMoreButton.classList.add("hidden");
};
