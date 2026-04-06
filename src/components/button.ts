export function createButton(
  type: "detail" | "more",
  text: string,
  onClick: () => void,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = `primary ${type === "detail" ? "detail" : "full-width"}`;
  button.textContent = text;

  button.addEventListener("click", onClick);
  return button;
}
