type Element = keyof HTMLElementTagNameMap;

type ElementProps = {
  [prop: string]: string;
};

export const createElement = <T extends HTMLElement>(
  tag: Element,
  classList: string[] = [],
  props: ElementProps = {},
): T => {
  const element = document.createElement(tag) as T;

  if (classList) element.classList.add(classList.join(' '));

  Object.entries(props).forEach(([key, value]) => {
    if (key in element) {
      (element[key as keyof T] as unknown) = value;
      return;
    }

    if (!(key in element)) {
      element.setAttribute(key, value);
    }
  });

  return element;
};
