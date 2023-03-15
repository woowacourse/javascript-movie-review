export const $ = <E extends Element>(selector: string, baseElement: E | Document = document): E | null =>
  baseElement.querySelector(selector);
