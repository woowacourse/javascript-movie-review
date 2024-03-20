export interface CustomEventListener {
  target: HTMLElement | Document;
  eventName: keyof HTMLElementEventMap;
  eventHandler: (event: Event) => void;
}
