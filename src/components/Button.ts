interface ButtonProps {
  className: string;
  textContent: string;
}

export default function Button({ className, textContent }: ButtonProps) {
  const $button = document.createElement("button");
  $button.className = `${className} primary`;
  $button.textContent = textContent;

  return $button;
}
