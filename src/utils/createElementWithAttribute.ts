interface Attribute {
  [key: string]: string;
}

const createElementWithAttribute = <T extends HTMLElement>(
  elementTag: string,
  attribute: Attribute,
): T => {
  const $element = document.createElement(elementTag) as T;

  Object.entries(attribute).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });

  return $element;
};

export default createElementWithAttribute;
