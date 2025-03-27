type EventHandler = (...args: any[]) => void;

export default class EventBus {
  private static instance: EventBus;
  private events: Map<string, EventHandler[]>;

  private constructor() {
    this.events = new Map();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  on(eventType: string, handler: EventHandler) {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, []);
    }

    const handlers = this.events.get(eventType);
    if (handlers) handlers.push(handler);
  }

  emit(eventType: string, ...args: any[]) {
    if (!this.events.has(eventType)) return;

    const handlers = this.events.get(eventType);
    if (handlers) handlers.forEach((handler) => handler(...args));
  }
}
