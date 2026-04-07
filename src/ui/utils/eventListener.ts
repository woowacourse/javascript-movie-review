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
