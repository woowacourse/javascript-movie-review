export const $ = <T extends Element>(
  selector: string,
  target: Element = document.documentElement,
) => {
  const $HTMLElement = target.querySelector(selector);
  if (!$HTMLElement) throw new Error(`Element is not defined.`);
  return <T>$HTMLElement;
};
