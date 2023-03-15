import type { CustomEvent } from "../types/type";

export const $ = (
  selector: string,
  target: HTMLElement | Document = document
) => target.querySelector(selector);

export const dispatchCustomEvent = (
  $target: HTMLElement,
  { eventType, data = null }: CustomEvent
) => {
  const customEvent = new CustomEvent(eventType, { detail: data });

  $target.dispatchEvent(customEvent);
};
