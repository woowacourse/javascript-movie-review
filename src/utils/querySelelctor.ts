export const $ = <T extends Element>(selectors: string, parent?: Element | Document): T | null => {
  const target = parent || document;
  return target.querySelector<T>(selectors);
};

export const $$ = <T extends Element>(selectors: string, parent?: Element | Document) => {
  const target = parent || document;
  return target.querySelectorAll<T>(selectors);
};
