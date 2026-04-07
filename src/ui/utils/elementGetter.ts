export function getElementBySelector(selector: string): HTMLElement | null {
  const element = document.querySelector(selector);
  if (element instanceof HTMLElement) return element;
  return null;
}
