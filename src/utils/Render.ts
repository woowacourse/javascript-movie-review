export const toggleDisplay = (element: HTMLElement, isVisible: boolean) => {
  if (isVisible) element.classList.remove("hidden");
  else element.classList.add("hidden");
};

export const toggleVisibility = (element: HTMLElement, isVisible: boolean) => {
  if (isVisible) element.classList.add("active");
  else element.classList.remove("active");
};
