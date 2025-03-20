export function showElement(element: Element | null) {
  element?.classList.remove("hide");
}

export function hideElement(element: Element | null) {
  element?.classList.add("hide");
}
export function hideImgSkeleton(event: Event) {
  const img = event.target;

  showElement(img);

  const skeleton = img.parentElement.parentElement.querySelector(
    ".skeleton-thumbnail"
  );

  skeleton?.remove();
}
