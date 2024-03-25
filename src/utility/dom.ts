export const $ = <T extends string>(
  selector: T,
  target = document
): HTMLElement | null => {
  const targetElement = target.querySelector(selector);

  if (!targetElement) {
    return null;
  }

  return targetElement as HTMLElement;
};

export const $$ = <T extends string>(selector: T, target = document) => {
  const targetElements = target.querySelectorAll(selector);

  if (!targetElements) {
    return null;
  }

  return targetElements;
};

export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes?: Record<string, string>
): HTMLElement => {
  const element = document.createElement(tagName);

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
};
