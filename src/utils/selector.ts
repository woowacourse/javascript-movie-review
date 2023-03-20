const $ = (seletor: string): Element => {
  const selectedElement = document.querySelector(seletor);

  if (!selectedElement) throw new Error(`${seletor}요소를 찾을 수 없습니다.`);

  return selectedElement;
};

const $$ = (seletor: string): NodeListOf<Element> => {
  const selectedElements = document.querySelectorAll(seletor);

  if (!selectedElements) throw new Error(`${seletor}요소를 찾을 수 없습니다.`);

  return selectedElements;
};

export { $, $$ };
