const ERROR_ELEMENT_NOT_FOUND = '요소를 불러오는 데 실패했습니다. 페이지를 새로고침 해 주세요.';

const $ = (selector: string, target?: HTMLElement): HTMLElement => {
  const $selectedElement = target
    ? target.querySelector(selector)
    : document.querySelector(selector);

  if (!($selectedElement instanceof HTMLElement))
    throw new Error(`${ERROR_ELEMENT_NOT_FOUND} - "${selector}"`);

  return $selectedElement;
};

const $$ = (selector: string, target?: HTMLElement): NodeListOf<Element> => {
  const $selectedElements = target
    ? target.querySelectorAll(selector)
    : document.querySelectorAll(selector);

  return $selectedElements;
};

export { $, $$ };
