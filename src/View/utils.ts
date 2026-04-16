export const getElementOrThrow = <T extends Element>(selector: string): T => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`${selector} 요소를 찾을 수 없습니다.`);
  }

  return element as T;
};

export const getYearFromDate = (dateString: string): number => {
  const date = new Date(dateString);
  return date.getFullYear();
};
