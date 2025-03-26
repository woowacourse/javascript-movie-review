import { Attribute } from "../../../types";
import { parseAttribute } from "../../utils/domHelper";

interface InputProps {
  attribute: Attribute;
}

const Input = (props: InputProps) => {
  const { attribute } = props;

  return `
  <input ${parseAttribute(attribute)} />
 `;
};

export default Input;
