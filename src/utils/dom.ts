export const createElement = <T>(selector: keyof HTMLElementTagNameMap) => document.createElement(selector) as T;

export const $ = <E extends Element>(selector: string, baseElement: Element | Document = document): E | null => {
  return baseElement.querySelector(selector);
};

export const $$ = <E extends Element>(selector: string, baseElement: Element | Document = document): NodeListOf<E> => {
  return baseElement.querySelectorAll(selector);
};

export const isMobileDevice = () => {
  return window.innerWidth <= 677;
};
