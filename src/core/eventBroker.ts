class EventBroker {
  private eventTarget = new EventTarget();
  private subscribers = new Map<string, Set<(handler: unknown) => void>>();

  dispatch(eventName: string, data: unknown, handleData: (data: unknown) => unknown = data => data): void {
    const eventListeners = this.subscribers.get(eventName);
    if (!eventListeners) this.subscribers.set(eventName, new Set());

    this.eventTarget.dispatchEvent(new CustomEvent(eventName, { detail: handleData(data) }));
  }

  subscribe(eventName: string, eventListener: (data: unknown) => void): void {
    let eventListeners = this.subscribers.get(eventName);

    if (!eventListeners) {
      console.error('No event listeners for this event');
      return;
    }

    eventListeners.add(eventListener);
    this.eventTarget.addEventListener(eventName, (event: Event) => {
      const eventData = (event as CustomEvent).detail;

      eventListeners?.forEach(listener => listener(eventData));
    });
  }
}

export default {
  movieEventBroker: new EventBroker(),
  errorEventBroker: new EventBroker(),
};
