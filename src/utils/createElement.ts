type ElementTag = keyof HTMLElementTagNameMap;

interface ElementOption<T> {
  [prop: string]: string;
}

function createElement<T extends HTMLElement>(tag: ElementTag, props: ElementOption<T> = {}): T {
  const element = document.createElement(tag) as T;
  Object.entries(props).forEach(([key, value]) => {
    if (key in element) (element[key as keyof T] as unknown) = value;
    else element.setAttribute(key, value);
  });
  return element;
}

export default createElement;
