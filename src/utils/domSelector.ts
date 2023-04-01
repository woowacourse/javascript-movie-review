const ERROR_ELEMENT_NOT_FOUND = '요소를 불러오는 데 실패했습니다. 페이지를 새로고침 해 주세요.';

const $ = (selector: string, target: HTMLElement | Document = document): HTMLElement => {
  const $selectedElement = target.querySelector(selector);

  if (!($selectedElement instanceof HTMLElement))
    throw new Error(`${ERROR_ELEMENT_NOT_FOUND} - "${selector}"`);

  return $selectedElement;
};

const $$ = (selector: string, target: HTMLElement | Document = document): NodeListOf<Element> => {
  return target.querySelectorAll(selector);
};

export { $, $$ };
