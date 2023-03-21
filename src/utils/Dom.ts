export const $ = (selector: string): HTMLElement | null =>
  document.querySelector(selector);

export const $$ = (
  selector: string,
  element: HTMLElement
): HTMLElement | null => document.querySelector(selector);
