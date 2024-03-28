export interface CustomEventListener {
  target: HTMLElement | Document | Window;
  eventName: keyof HTMLElementEventMap;
  eventHandler: (event: Event) => void;
}
