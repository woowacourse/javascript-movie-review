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

export const appendChildren = (parents: Element | Element[], children: Element[]): void => {
  const parentsArray = Array.isArray(parents) ? parents : [parents];

  parentsArray.reduce((prevParent, currentParent) => {
    prevParent.appendChild(currentParent);
    return currentParent;
  });

  children.forEach((child) => parentsArray[parentsArray.length - 1].appendChild(child));
};

const addEventListenerToElement = (element: HTMLElement, eventType: string, listener: EventListener) => {
  element.addEventListener(eventType, listener);
};

const setTextContentOfElement = (element: HTMLElement, text: string) => {
  element.innerText = text;
};

const setAttributeOfElement = (element: HTMLElement, attributeName: string, attributeValue: string) => {
  element.setAttribute(attributeName, attributeValue);
};

export const configureElement = (element: HTMLElement, attributes: { [key: string]: string | EventListener }): void => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (typeof value === 'function') {
      addEventListenerToElement(element, key, value as EventListener);
    } else if (key === 'text') {
      setTextContentOfElement(element, value as string);
    } else {
      setAttributeOfElement(element, key, value as string);
    }
  });
};
