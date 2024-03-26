interface Props {
  tagName: string;
  attribute?: Record<string, string>;
  addEventListener?: Record<string, (e: Event) => void>;
  children?: (HTMLElement | string)[];
}

const createElement = ({
  tagName,
  attribute = {},
  addEventListener = {},
  children = [],
}: Props) => {
  const $element = document.createElement(tagName);

  Object.entries(attribute).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });

  Object.entries(addEventListener).forEach(([eventType, listener]) => {
    $element.addEventListener(eventType, listener);
  });

  $element.append(...children);

  return $element;
};

export default createElement;
