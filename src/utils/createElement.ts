type Element = keyof HTMLElementTagNameMap;

export type ElementProps = {
  [prop: string]: string | HTMLElement[];
};

export const createElement = <T extends HTMLElement>(
  tag: Element,
  { children, ...props }: ElementProps & { children?: HTMLElement[] } = {},
): T => {
  const element = document.createElement(tag) as T;

  Object.entries(props).forEach(([key, value]) => {
    if (key in element) {
      (element[key as keyof T] as unknown) = value;
      return;
    }
    if (!(key in element)) {
      element.setAttribute(key, value as string);
    }
  });

  if (children) {
    element.append(...children);
  }

  return element;
};
