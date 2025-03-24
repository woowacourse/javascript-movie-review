import { createElement } from "../../utils/createElement";

type Props = {
  text: string;
  className: string[];
  onClick: () => void;
};

const Button = ({ text, className, onClick }: Props) => {
  const button = createElement(/*html*/ `
    <button class=${className.join(" ")} >${text}</button>
  `);
  button.addEventListener("click", onClick);

  return button;
};
export default Button;
