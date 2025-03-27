export const isElement = (target: EventTarget | null): target is Element => {
  return target instanceof Element;
};

export const isHTMLElement = (
  target: EventTarget | null
): target is HTMLElement => {
  return target instanceof HTMLElement;
};

export const isForm = (
  target: EventTarget | null
): target is HTMLFormElement => {
  return target instanceof HTMLFormElement;
};

export const isInput = (
  target: EventTarget | null
): target is HTMLInputElement => {
  return target instanceof HTMLInputElement;
};
