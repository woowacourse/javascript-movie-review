const $ = (seletor: string): Element => {
  const selectedElement = document.querySelector(seletor);

  if (!selectedElement) throw new Error(`생성된 ${seletor}요소가 없습니다.`);

  return selectedElement;
};
const $$ = (seletor: string): NodeListOf<Element> => {
  const selectedElementAll = document.querySelectorAll(seletor);

  if (!selectedElementAll) throw new Error(`생성된 ${seletor}요소가 없습니다.`);

  return selectedElementAll;
};

export { $, $$ };
