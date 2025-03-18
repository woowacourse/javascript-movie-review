export const isHTMLElement = (
  target: EventTarget | null
): target is HTMLElement => {
  return target instanceof HTMLElement;
};
