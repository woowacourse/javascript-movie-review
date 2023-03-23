export const $ = <E extends Element>(selector: string, baseElement: E | Document = document) => {
  return baseElement.querySelector(selector);
};

export const $$ = <E extends Element>(selector: string, baseElement: E | Document = document) => {
  return baseElement.querySelectorAll(selector);
};
