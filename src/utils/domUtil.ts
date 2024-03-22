export function appendChildren(targetElement: HTMLElement, children: HTMLElement[]) {
  children.forEach((child) => {
    targetElement.appendChild(child);
  });
}

export function elementsReplaceWith(targetElements: HTMLElement[], replaceElements: HTMLElement[]) {
  const loopCount = targetElements.length;
  for (let i = 0; i < loopCount; i += 1) {
    targetElements[i].replaceWith(replaceElements[i]);
  }
}
