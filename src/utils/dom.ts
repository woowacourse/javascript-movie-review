export const $ = (selector:string, parent = document) =>
  parent.querySelector(selector);

export const $$ = (selector:string, parent = document) =>
  Array.from(parent.querySelectorAll(selector));
