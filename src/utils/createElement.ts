type ElementTag = keyof HTMLElementTagNameMap;

/* eslint-disable @typescript-eslint/no-unused-vars */
interface ElementOption {
  [prop: string]: string;
}

function createElement<T extends HTMLElement>(tag: ElementTag, props: ElementOption = {}) {
  const element = document.createElement(tag) as T;
  Object.entries(props).forEach(([key, value]) => {
    if (key in element) (element[key as keyof T] as unknown) = value;
    else element.setAttribute(key, value);
  });
  return element;
}

export default createElement;
