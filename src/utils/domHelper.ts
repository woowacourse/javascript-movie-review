export function $(selector: string, scope: Document | HTMLElement = document) {
  if (!selector) throw new Error("Selector is not selected");

  return scope.querySelector(selector);
}

export function $$(selector: string, scope: Document | HTMLElement = document) {
  if (!selector) throw new Error("Selector is not selected");

  return scope.querySelectorAll(selector);
}
