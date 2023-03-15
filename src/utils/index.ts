export const render = (template: any) => {
  const bodyElem = $('#app') as HTMLElement;
  bodyElem.innerHTML = template();
};

export const $ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelector(selector);
export const $$ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelectorAll(selector);
