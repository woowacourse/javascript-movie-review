type ElementAttributes = {
  [key: string]: string;
};

export type ElementOptions = {
  tag: keyof HTMLElementTagNameMap;
  id?: string;
  className?: string;
  attributes?: ElementAttributes;
  textContent?: string;
  children?: (ElementOptions | HTMLElement)[];
  onload?: () => void;
};

export const createElementWithAttributes = ({
  tag,
  id = "",
  className = "",
  attributes = {},
  textContent = "",
  children = [],
  onload = () => {},
}: ElementOptions): HTMLElement => {
  const element = document.createElement(tag);

  if (id) {
    element.setAttribute("id", id);
  }

  if (className) {
    element.classList.add(...className.split(" "));
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  if (textContent) {
    element.textContent = textContent;
  }

  if (Array.isArray(children) && children.length) {
    const fragment = document.createDocumentFragment();
    children.forEach((child) => {
      if (child instanceof HTMLElement) {
        fragment.append(child);
      } else {
        fragment.append(createElementWithAttributes(child));
      }
    });
    element.append(fragment);
  }

  if (typeof onload === "function") {
    element.onload = onload;
  }

  return element;
};
