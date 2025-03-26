import { Attribute } from "../../types";

export const $ = (
  selector: string,
  scope: Document | HTMLElement = document
) => {
  if (!selector) throw new Error("Selector is not selected");

  return scope.querySelector(selector) as HTMLElement;
};

export const $$ = (
  selector: string,
  scope: Document | HTMLElement = document
) => {
  if (!selector) throw new Error("Selector is not selected");

  return scope.querySelectorAll(selector);
};

export const parseAttribute = (attribute: Attribute) => {
  return Object.entries(attribute)
    .map(([key, value]) => `${key}="${value}"`)
    .join("");
};

export const isTarget = (
  target: EventTarget | null,
  {
    targetSelector,
    parentSelector,
  }: { targetSelector: string; parentSelector: string }
) => {
  const children = $$(targetSelector, $(parentSelector));

  if (target instanceof Element && children)
    return [...children].includes(target) || target.closest(targetSelector);

  return false;
};
