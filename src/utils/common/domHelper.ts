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

export const replaceComponent = (element: Element | null, component: Element | null) => {
  if (element && component) {
    element.replaceWith(component);
  }
};
