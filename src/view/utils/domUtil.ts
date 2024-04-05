/* eslint-disable max-depth */
/* eslint-disable import/prefer-default-export */

export function elementsReplaceWith(targetElements: HTMLElement[], replaceElements: HTMLElement[]) {
  const loopCount = targetElements.length;
  for (let i = 0; i < loopCount; i += 1) {
    if (replaceElements[i]) targetElements[i].replaceWith(replaceElements[i]);
    if (!replaceElements[i]) targetElements[i].remove();
  }
}
