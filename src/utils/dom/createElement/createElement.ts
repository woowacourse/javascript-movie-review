import { CreateElementParams } from './createElement.type';

export const createElement = ({ tagName, text, attributeOptions }: CreateElementParams) => {
  const htmlElement = document.createElement(tagName);

  if (attributeOptions) {
    Object.entries(attributeOptions).forEach(([key, value]) => {
      htmlElement.setAttribute(key, value);
    });
  }

  if (text) {
    htmlElement.textContent = text;
  }

  return htmlElement;
};
