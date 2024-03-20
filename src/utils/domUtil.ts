export function appendChildren(targetElement: HTMLElement, ...children: HTMLElement[]) {
  children.forEach((child) => {
    targetElement.appendChild(child);
  });
}
