import { createElement } from "../utils/dom";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  const $detailButton = createElement("button", {
    class: ["detail-button", "primary"],
    textContent: text,
    onClick,
  });

  return $detailButton;
};

export default Button;
