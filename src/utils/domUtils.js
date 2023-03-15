export const dispatchCustomEvent = ($target, eventType, data = null) => {
  const customEvent = new CustomEvent(eventType, { bubbles: true, detail: data });
  $target.dispatchEvent(customEvent);
};

export const $ = (selectors) => document.querySelector(selectors);

export const hideElement = (element) => element.classList.add('hide');

export const showElement = (element) => element.classList.remove('hide');
