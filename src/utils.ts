export const isElement = (target: EventTarget | null): target is Element => {
  return target instanceof Element;
};

export const $ = (selector: string) => {
  return document.querySelector(selector) as HTMLElement;
};
