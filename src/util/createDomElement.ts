type Event = Partial<Record<keyof GlobalEventHandlersEventMap, EventListenerOrEventListenerObject>>;

interface IProps {
  textContent?: HTMLElement['textContent'];
  className?: HTMLElement['className'];
  id?: HTMLElement['id'];
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

  (Object.keys(props) as Array<keyof IProps>).forEach((key) => {
    const value = props[key];
    if (value !== undefined && value !== null) {
      element[key] = value;
    }
  });

  children.forEach((child) => element.appendChild(child));

  return element;
};

export default createDOMElement;
