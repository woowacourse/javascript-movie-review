export function $(element: string) {
  return document.querySelector(element);
}

export function $$(elements: string) {
  return document.querySelectorAll(elements);
}
