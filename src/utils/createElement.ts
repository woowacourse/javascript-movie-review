import { ElementOption, ElementTag } from '../types/element';

function createElement<T extends HTMLElement>(tag: ElementTag, props: ElementOption = {}): T {
  const element = document.createElement(tag) as T;

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'onload' && typeof value === 'function') {
      element.addEventListener('load', value as (this: HTMLImageElement, ev: Event) => void);
    } else if (key in element) {
      (element[key as keyof T] as unknown) = value;
    } else {
      element.setAttribute(key, value as string);
    }
  });

  return element;
}

export default createElement;
