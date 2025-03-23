export const selectElement = <T extends Element>(
  selector: string,
  ancestor = document
): T => {
  const element = ancestor.querySelector<T>(selector);
  if (!element) {
    throw new Error(`selector가 ${selector}인 엘리먼트를 찾을 수 없습니다.`);
  }

  return element;
};

export const selectElementAll = <T extends Element>(
  selector: string,
  ancestor = document
): NodeListOf<T> => {
  const elements = ancestor.querySelectorAll<T>(selector);
  if (!elements) {
    throw new Error(`selector가 ${selector}인 엘리먼트들을 찾을 수 없습니다.`);
  }

  return elements;
};
