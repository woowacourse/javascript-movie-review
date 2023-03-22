export const $ = <E extends Element>(selector: string, baseElement: E | Document = document) => {
  return baseElement.querySelector(selector);
};
