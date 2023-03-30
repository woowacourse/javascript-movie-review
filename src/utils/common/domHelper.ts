export interface Attribute {
  class: string;
  [key: string]: string | boolean;
}

export const $ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelector(selector);
export const $$ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelectorAll(selector);

export const getElement = (template: string) => {
  const root = document.createElement('div');
  root.innerHTML = template;

  return root.firstElementChild;
};

export const replaceComponent = (rootComponent: Element, elemnetId: string, component: Element | null) => {
  const element = $(elemnetId, rootComponent);
  if (!element || !element.parentNode) return;
  if (!component) {
    element.parentNode.removeChild(element);
    return;
  }
  element.parentNode.replaceChild(component, element);
};
