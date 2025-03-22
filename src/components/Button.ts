import { createElement } from "../utils";

interface ButtonProps {
  className: string;
  textContent: string;
}

export default function Button({ className, textContent }: ButtonProps) {
  const $button = createElement(`
      <button class="primary ${className}">${textContent}</button>
    `);
  return $button;
}
