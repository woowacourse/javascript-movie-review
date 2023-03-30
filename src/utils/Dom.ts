export const $$ = <T extends HTMLElement = HTMLElement>(
  selector: string,
  expectedType?: new () => T,
  searchRoot?: HTMLElement,
): T => {
  const element = (searchRoot ?? document).querySelector(selector);

  if (!element) {
    throw new Error(`No element found for selector '${selector}'.`);
  }

  if (expectedType && !(element instanceof expectedType)) {
    throw new Error(`Element found for selector '${selector}' is not of the expected type.`);
  }

  return element as T;
};
