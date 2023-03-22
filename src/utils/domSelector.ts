const $ = <E extends Element>(selector: string): E => {
  const $HTMLElement = document.querySelector(selector);
  if (!$HTMLElement) throw new Error(`Dom Error`);

  return <E>$HTMLElement;
};

const $$ = <E extends Element>(selector: string): NodeListOf<E> => {
  return document.querySelectorAll(selector);
};

export { $, $$ };
