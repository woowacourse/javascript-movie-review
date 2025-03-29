import { Attribute, PropsWithChildren } from "../../../types";
import { parseAttribute } from "../../utils/domHelper";
import { renderIfString } from "../../utils/render";

interface SearchResultMessageProps {
  isError: boolean;
  attribute: Attribute;
}

const SearchResultMessage = (
  props: PropsWithChildren<SearchResultMessageProps>
) => {
  const { isError, children, attribute } = props;

  return renderIfString(
    isError,
    `<div ${parseAttribute(attribute)}>${children}</div>`
  );
};

export default SearchResultMessage;
