type Event = Record<keyof GlobalEventHandlersEventMap, EventListenerOrEventListenerObject>;

interface IProps {
  textContent?: string;
  className?: string;
  id?: string;
}

interface DOMElementProps extends IProps {
  tag: keyof HTMLElementTagNameMap;
  children?: HTMLElement[];
  event?: Event;
  attributes?: Record<string, string>;
}

const createDOMElement = ({
  tag,
  children = [],
  attributes = {},
  event = {} as Event,
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
