interface ButtonOptions {
  text: string;
  width: "full" | "fit";
  size: "s" | "m";
  disabled?: boolean;
  onClick: () => void;
}

export function createButton({
  text,
  width,
  size,
  disabled = false,
  onClick,
}: ButtonOptions): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = `primary ${width === "full" ? "full-width" : "fit"} ${size}`;
  button.textContent = text;
  button.disabled = disabled;

  button.addEventListener("click", onClick);
  return button;
}
