interface AddEventListenerToElementArg {
  element: HTMLElement | null;
  event: string;
  handler: EventListenerOrEventListenerObject;
}

export function addEventListenerToElement({
  element,
  event,
  handler,
}: AddEventListenerToElementArg) {
  if (element) element.addEventListener(event, handler);
}

interface ReplaceEventListenerToElementArg {
  element: HTMLElement | null;
  event: string;
  prevHandler: EventListenerOrEventListenerObject | null;
  nextHandler: EventListenerOrEventListenerObject;
}

export function replaceEventListenerToElement({
  element,
  event,
  prevHandler,
  nextHandler,
}: ReplaceEventListenerToElementArg) {
  if (!element) return;
  if (prevHandler) element.removeEventListener(event, prevHandler);
  element.addEventListener(event, nextHandler);
}
