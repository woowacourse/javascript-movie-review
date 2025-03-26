interface ButtonProps extends Partial<HTMLButtonElement> {
  className?: string;
  textContent: string;
}

export default function Button({
  className = "",
  textContent,
  type = "button",
}: ButtonProps) {
  const $button = document.createElement("button");
  $button.className = `primary ${className}`;
  $button.textContent = textContent;
  $button.type = type;

  return $button;
}
