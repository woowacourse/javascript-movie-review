export function createDetailButton(onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = "primary detail";
  button.textContent = "자세히 보기";

  button.addEventListener("click", onClick);
  return button;
}
