import { createElement } from "../../utils/createElement";

type Props = {
  text: string;
  className: string[];
  onClick: (e?: MouseEvent) => void;
};

const Button = ({ text, className, onClick }: Props) => {
  const button = createElement(
    /*html*/ `
    <button class=${className.join(" ")}>${text}</button>
  `,
    { click: onClick }
  );

  return button;
};
export default Button;
