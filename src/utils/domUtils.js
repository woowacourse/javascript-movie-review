export const dispatchCustomEvent = ($target, eventType, data = null) => {
  const customEvent = new CustomEvent(eventType, { bubbles: true, detail: data });
  $target.dispatchEvent(customEvent);
};

export const $ = (selectors) => document.querySelector(selectors);
