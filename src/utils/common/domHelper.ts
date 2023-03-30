export interface Attribute {
  class: string;
  [key: string]: string | boolean;
}

export const $ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode?.querySelector(selector) ?? null;
export const $$ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode?.querySelectorAll(selector) ?? null;

export const getElement = (template: string) => {
  const root = document.createElement('div');
  root.innerHTML = template;

  return root.firstElementChild;
};

export const isHTMLElement = (target: unknown): target is HTMLElement => target instanceof HTMLElement;
export const isHTMLInputElement = (target: unknown): target is HTMLInputElement => target instanceof HTMLInputElement;

export const getClosest = (target: Element | EventTarget | null, selector: string) => {
  if (!(target instanceof Element)) return null;

  const parent = target.closest(selector);
  if (!parent) return null;
  if (!isHTMLElement(parent)) return null;

  return parent;
};

export const replaceComponent = (element: Element | null, component: Element | null) => {
  if (element && component) {
    element.replaceWith(component);
  }
};
