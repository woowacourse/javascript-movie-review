interface Attribute {
  [key: string]: string;
}

const createElementWithAttribute = (
  elementTag: string,
  attribute: Attribute,
) => {
  const $element = document.createElement(elementTag);
  Object.entries(attribute).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });

  return $element;
};
export default createElementWithAttribute;
