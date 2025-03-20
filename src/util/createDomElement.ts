type Event = Record<string, EventListenerOrEventListenerObject>;

interface DOMElementProps {
  tag: string;
  children?: HTMLElement[];
  event?: Event;
  attributes?: Record<string, string>;
  [key: string]: any;
}

const createDOMElement = ({
  tag,
  children = [],
  attributes = {},
  event = {},
  ...props
}: DOMElementProps): HTMLElement => {
  const element = document.createElement(tag);

  Object.entries(event).forEach(([eventName, eventHandler]) => {
    element.addEventListener(eventName, eventHandler);
  });

  Object.entries(attributes).forEach(([attrName, attributes]) => {
    element.setAttribute(attrName, attributes);
  });

  Object.entries(props).forEach(([propName, propValue]) => {
    if (propName in element) {
      (element as any)[propName] = propValue;
    }
  });

  children.forEach((child) => element.appendChild(child));

  return element;
};

export default createDOMElement;
