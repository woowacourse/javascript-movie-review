export function createButton(
  type: "detail" | "more",
  text: string,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = `primary ${type === "detail" ? "detail" : "full-width"}`;
  button.textContent = text;

  return button;
}
