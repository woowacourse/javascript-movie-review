// querySelector
export const $ = <T extends Element>(selector: string): T => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`${selector} 요소를 찾을 수 없습니다`);
  }

  return element as T;
};

// querySelectorAll
export const $$ = <T extends Element>(selector: string): T[] => {
  const elements = Array.from(document.querySelectorAll(selector));

  if (elements.length === 0) {
    throw new Error(`${selector} 요소를 찾을 수 없습니다`);
  }

  return elements as T[];
};
