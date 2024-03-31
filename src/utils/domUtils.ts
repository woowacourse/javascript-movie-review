/* element의 속성을 수정하는 모듈이므로, 위 규칙 비활성화 (element.innerText) */
/* eslint-disable no-param-reassign */

export const $ = <T extends Element = Element>(
  selector: string,
  scope: Document | Element = document,
  canNull = false
): T | null => {
  const element = scope.querySelector<T>(selector);

  if (!canNull && !element) {
    throw new Error('No element matches the selector:' + selector);
  }

  return element;
};

export const $$ = <T extends Element = Element>(
  selector: string,
  scope: Document | Element = document,
  throwError = false
): NodeListOf<T> => {
  const elements = scope.querySelectorAll<T>(selector);

  if (throwError && elements.length === 0) {
    throw new Error('No elements match the selector:' + selector);
  }

  return elements;
};

export const setAttributes = (element: HTMLElement, attributes: { [key: string]: string | EventListener }): void => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'function') element.addEventListener(key, value);
    else if (key === 'text') element.innerText = value;
    else element.setAttribute(key, value);
  });
};

export const appendChildren = (parents: Element | Element[], children: Element[]): void => {
  const parentsArray = Array.isArray(parents) ? parents : [parents];

  parentsArray.reduce((prevParent, currentParent) => {
    prevParent.appendChild(currentParent);
    return currentParent;
  });

  children.forEach((child) => parentsArray[parentsArray.length - 1].appendChild(child));
};
