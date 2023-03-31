export const $ = (selector: string) => {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`해당 엘리먼트 "${selector}"를 찾을 수 없습니다.`);
  }
  return element;
};
