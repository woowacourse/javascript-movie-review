export const $ = <T extends Element>(el: Element, selector: string): T => {
  const found = el.querySelector<T>(selector);
  if (!found) throw new Error(`${selector} 없음`);
  return found;
};
