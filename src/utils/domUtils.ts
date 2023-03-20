export const dispatchCustomEvent = (
  $target: HTMLElement,
  eventType: string,
  detail: null | object = null
) => {
  $target.dispatchEvent(new CustomEvent(eventType, { bubbles: true, detail }));
};

export const $ = (selectors: string) => document.querySelector(selectors);
