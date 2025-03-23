import { createElement } from "../../utils/createElement";

type Props = {
  text: string;
  className: string[];
};

const Button = ({ text, className }: Props) => {
  return createElement(/*html*/ `
    <button class=${className.join(" ")}>${text}</button>
  `);
};
export default Button;
