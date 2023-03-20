type CustomEventType = 'home' | 'search' | 'loadMore';

export const dispatchCustomEvent = (
  $target: HTMLElement,
  eventType: CustomEventType,
  data: unknown = null
) => {
  const customEvent = new CustomEvent(eventType, { bubbles: true, detail: data });

  $target.dispatchEvent(customEvent);
};

export const $ = (selector: string) => document.querySelector(selector);

export const isFormElement = (target: Element | null): target is HTMLFormElement =>
  target instanceof HTMLFormElement;

export const isInputElement = (target: Element | null): target is HTMLInputElement =>
  target instanceof HTMLInputElement;
