export function $(
  selector: string,
  scope: Document | Element = document
): Element | null {
  if (!selector) throw new Error("No selector provided");

  return scope.querySelector(selector);
}

export function $$(
  selector: string,
  scope: Document | Element = document
): NodeListOf<Element> {
  if (!selector) throw new Error("No selector provided");

  return scope.querySelectorAll(selector);
}
