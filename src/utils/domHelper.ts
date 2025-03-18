export interface Attribute {
  class: string;
  [key: string]: string;
}

export const $ = (
  selector: string,
  scope: Document | HTMLElement = document
) => {
  if (!selector) throw new Error("Selector is not selected");

  return scope.querySelector(selector);
};

export const $$ = (
  selector: string,
  scope: Document | HTMLElement = document
) => {
  if (!selector) throw new Error("Selector is not selected");

  return scope.querySelectorAll(selector);
};

export const parseAttribute = (attribute: Attribute) => {
  console.log(
    Object.entries(attribute)
      .map(([key, value]) => `${key} = ${value}`)
      .join("")
  );
  return Object.entries(attribute)
    .map(([key, value]) => `${key}="${value}"`)
    .join("");
};
