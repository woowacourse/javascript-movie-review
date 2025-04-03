import createElement from "./utils/createElement";
import { ButtonType } from "../types/ButtonType";

interface ButtonProps {
  text: string;
  type: ButtonType;
}

const Button = ({ text, type }: ButtonProps) => {
  const $button = createElement({
    tag: "button",
    classNames: ["primary", type],
  });

  $button.textContent = text;

  return $button;
};

export default Button;
