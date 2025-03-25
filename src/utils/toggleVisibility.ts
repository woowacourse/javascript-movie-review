const toggleVisibility = (element: HTMLElement, option: "show" | "hidden") => {
  if (option === "show") element.classList.remove("hidden");
  if (option === "hidden") element.classList.add("hidden");
};

export default toggleVisibility;
