export const $ = <E extends Element>(selector: string, target: Element | Document = document) => {
  const element = target.querySelector<E>(selector);

  if (!element) {
    console.log(`${selector}를 찾을 수 없습니다!`);
  }

  return element;
};
