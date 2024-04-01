interface Props {
  tagName: string;
  attribute?: Record<string, string>;
  eventListener?: Record<string, (e: Event) => void>;
  children?: (HTMLElement | string)[];
}

const createElement = ({
  tagName,
  attribute = {},
  eventListener: eventListener = {},
  children = [],
}: Props) => {
  const $element = document.createElement(tagName);

  Object.entries(attribute).forEach(([key, value]) => {
    $element.setAttribute(key, value);
  });

  Object.entries(eventListener).forEach(([eventType, listener]) => {
    $element.addEventListener(eventType, listener);
  });

  $element.append(...children);

  return $element;
};

export default createElement;
