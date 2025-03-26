import { selectElement } from "./dom.ts";

export const toggleElementVisibility = (
  selector: string,
  option: "show" | "hidden"
) => {
  const element = selectElement<HTMLElement>(selector);
  if (option === "show") element.classList.remove("hidden");
  if (option === "hidden") element.classList.add("hidden");
};
