import { toElement } from "../utils/domUtils";

interface ButtonProps {
  className: string;
  textContent: string;
}

export default function Button({ className, textContent }: ButtonProps) {
  return toElement(
    `<button class="${className} primary">${textContent}</button>`
  );
}
