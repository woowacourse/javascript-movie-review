import { eventBus } from "../../pubsub/EventBus";
import { APP_EVENTS } from "../../pubsub/AppEvents";

export class ScrollObserver {
  private observer: IntersectionObserver;

  constructor(private sentinel: HTMLElement) {
    this.observer = new IntersectionObserver(this.onIntersect.bind(this));
  }

  private onIntersect(entries: IntersectionObserverEntry[]) {
    if (entries[0].isIntersecting) {
      eventBus.publish(APP_EVENTS.LOAD_MORE, undefined);
    }
  }

  observe() {
    this.observer.observe(this.sentinel);
  }

  disconnect() {
    this.observer.disconnect();
  }
}
