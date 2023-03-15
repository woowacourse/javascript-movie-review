export interface Attribute {
  class: string;
  [key: string]: string | boolean;
}

export const $ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelector(selector);
export const $$ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelectorAll(selector);

export const isTarget = (
  target: EventTarget | null,
  { targetSelector, parentSelector }: { targetSelector: string; parentSelector: string }
) => {
  const children = $$(targetSelector, $(parentSelector));

  if (target instanceof Element && children) return [...children].includes(target) || target.closest(targetSelector);

  return false;
};

export const getClosest = (target: EventTarget | null, selector: string) => {
  if (!(target instanceof Element)) return null;
  if (!(target.closest(selector) instanceof HTMLElement)) return null;

  return target.closest(selector) as HTMLElement;
};

export const parseAttribute = (attribute: Attribute) => {
  return Object.entries(attribute)
    .map(([key, value]) => (typeof value === 'boolean' ? (value === true ? `${key}` : '') : `${key}="${value}"`))
    .join(' ');
};

export const parseClassToSelector = (className: string) => '.' + className.split(' ').join('.');

export const getElement = (template: string) => {
  const root = document.createElement('div');
  root.innerHTML = template;

  return root.firstElementChild;
};

export const replaceComponent = (element: Element | null, component: Element | null) => {
  if (!element || !component || !element.parentNode) return;

  element.replaceWith(component);
  /**@todo 추후 에러 발생 가능 */
  // element.parentNode.appendChild(component);
  // element.parentNode.replaceChild(component, element);
};
