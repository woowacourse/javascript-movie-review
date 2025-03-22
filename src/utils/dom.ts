export const $ = (selector: string, parent: Document | Element = document) =>
  parent.querySelector(selector) as HTMLElement;

export const $$ = (selector: string, parent = document) =>
  Array.from(parent.querySelectorAll(selector)) as HTMLElement[];
