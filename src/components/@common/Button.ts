import { Attribute, PropsWithChildren } from "../../../types";
import { parseAttribute } from "../../utils/domHelper";

interface ButtonProps {
  attribute: Attribute;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { attribute, children } = props;

  return `
    <button ${parseAttribute(attribute)}" >${children}</button>`;
};

export default Button;
