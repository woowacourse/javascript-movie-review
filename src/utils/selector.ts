export const $ = <E extends Element>(selector: string): E => {
  const element = document.querySelector(selector);
  if (element) return <E>element;
  throw new Error(`존재하지 않는 요소입니다: ${selector}`);
};

export const $$ = <E extends Element>(selector: string): NodeListOf<E> => {
  const elements = document.querySelectorAll(selector);
  if (elements.length) return elements as NodeListOf<E>;
  throw new Error(`존재하지 않는 요소입니다: ${selector}`);
};
