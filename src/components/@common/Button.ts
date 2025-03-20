import { PropsWithChildren } from "../../../types";
import { Attribute, parseAttribute } from "../../utils/domHelper";

interface ButtonProps {
  attribute: Attribute;
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { attribute, children } = props;

  return `
    <button ${
      attribute ? parseAttribute(attribute) : ""
    }" >${children}</button>`;
};

export default Button;
