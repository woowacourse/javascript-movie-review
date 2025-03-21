interface ButtonProps {
  className: string;
  textContent: string;
}

export default function Button({ className, textContent }: ButtonProps) {
  const $button = document.createElement("button");

  $button.className = `primary ${className}`;
  $button.textContent = textContent;

  return $button;
}
