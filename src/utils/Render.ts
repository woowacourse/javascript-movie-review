export const toggleVisibility = (
  element: Element | null,
  option: "show" | "hidden"
) => {
  if (option === "show") element?.classList.remove("hidden");
  if (option === "hidden") element?.classList.add("hidden");
};
