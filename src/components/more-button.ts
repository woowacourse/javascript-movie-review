export function createMoreButton(onClick: () => void): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = "btn primary full-width";
  button.textContent = "더 보기";

  button.addEventListener("click", onClick);
  return button;
}
