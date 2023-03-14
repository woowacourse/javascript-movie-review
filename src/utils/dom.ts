export const $ = (selector: string, target = document) =>
  target.querySelector(selector);
