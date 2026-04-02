export function createTitle(text: string): HTMLHeadingElement {
  const h2 = document.createElement("h2");
  h2.textContent = text;
  return h2;
}
