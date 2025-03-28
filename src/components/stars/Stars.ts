import { Attribute } from "../../../types";
import { parseAttribute } from "../../utils/domHelper";

interface StarsProps {
  attribute: Attribute;
}

const Stars = (props: StarsProps) => {
  const { attribute } = props;

  return `
    <img ${parseAttribute(attribute)} />
  `;
};

export default Stars;
