export const dispatchCustomEvent = ($target, eventType, detail = null) => {
  $target.dispatchEvent(new CustomEvent(eventType, { bubbles: true, detail }));
};

export const $ = (selectors) => document.querySelector(selectors);
