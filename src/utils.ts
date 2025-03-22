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
