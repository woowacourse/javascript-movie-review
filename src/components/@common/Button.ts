import { Attribute, parseAttribute } from "../../utils/domHelper";

interface ButtonProps {
  attribute: Attribute;
  children: string;
}

const Button = (props: ButtonProps) => {
  const { attribute, children } = props;

  return `<button ${
    attribute ? parseAttribute(attribute) : ""
  }">${children}</button>`;
};

export default Button;
