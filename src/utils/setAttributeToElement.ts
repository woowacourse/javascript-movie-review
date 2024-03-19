interface Attribute {
  [key: string]: string;
}

const isValidAttributeKey = (
  attribute: Attribute,
  $element: HTMLElement | Element,
) => {
  const keys = Object.keys(attribute);
  return keys.every((key) => key in $element);
};

const setAttributeToElement = (
  attribute: Attribute,
  $element: HTMLElement | Element,
) => {
  if (!isValidAttributeKey) return undefined;
  Object.entries(attribute).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });
  return $element;
};
export default setAttributeToElement;
