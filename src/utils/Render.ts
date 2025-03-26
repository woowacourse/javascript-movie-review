export const toggleDisplay = (
  element: HTMLElement,
  option: "show" | "hidden"
) => {
  if (option === "show") element.classList.remove("hidden");
  if (option === "hidden") element.classList.add("hidden");
};

export const toggleVisibility = (
  element: HTMLElement,
  option: "show" | "hidden"
) => {
  if (option === "show") element.classList.add("active");
  if (option === "hidden") element.classList.remove("active");
};
