import { Attribute, PropsWithChildren } from "../../../types";
import { parseAttribute } from "../../utils/domHelper";

interface ErrorMessageProps {
  className?: string;
  attribute: Attribute;
}

const ErrorMessage = (props: PropsWithChildren<ErrorMessageProps>) => {
  const { children, attribute } = props;

  return `<div ${parseAttribute(attribute)}>${children}</div>`;
};

export default ErrorMessage;
