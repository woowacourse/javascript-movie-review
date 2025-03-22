export const isElement = (target: EventTarget | null): target is Element => {
  return target instanceof Element;
};

export const isHTMLFormElement = (
  target: EventTarget | null
): target is HTMLFormElement => {
  return target instanceof HTMLFormElement;
};

export const $ = (selector: string) => {
  return document.querySelector(selector) as HTMLElement;
};

export const createElement = (innerHTML: string) => {
  // TODO: html의 내부에 요소가 2개 이상 있는 경우 에러 발생
  const element = document.createElement("div");
  element.innerHTML = innerHTML;
  return element.firstElementChild as HTMLElement;
};
