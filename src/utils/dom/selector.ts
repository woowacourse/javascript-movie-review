export const querySelector = <E extends Element>(selector: string, target: Element | Document = document) => {
  const element = target.querySelector<E>(selector);

  if (!element) {
    throw new Error(`[ERROR] ${selector} 요소를 찾을 수 없습니다.`);
  }

  return element;
};

export const querySelectorAll = <E extends Element>(selector: string, target: Element | Document = document) => {
  const element = target.querySelectorAll<E>(selector);

  if (!element) {
    throw new Error(`[ERROR] ${selector} 요소를 찾을 수 없습니다.`);
  }

  return element;
};
