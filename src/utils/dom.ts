export const $ = <T extends Element = Element>(selector: string) => {
  const element = document.querySelector<T>(selector);

  if (element === null) {
    throw new Error('element not found');
  }

  return element;
};
