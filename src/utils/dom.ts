type Selector = string;

export const $ = (selector: Selector): HTMLElement | null =>
  document.getElementById(selector);
