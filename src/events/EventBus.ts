import { EventPayloadType, EventTypes } from "./types/eventTypes";

export default class EventBus {
  private static instance: EventBus;
  private events: Map<string, Function[]>;

  private constructor() {
    this.events = new Map();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  on<T extends EventTypes>(
    eventType: T,
    handler: (data: EventPayloadType[T]) => void | Promise<void>
  ) {
    if (!this.events.has(eventType)) {
      this.events.set(eventType, []);
    }

    const handlers = this.events.get(eventType);
    if (handlers) handlers.push(handler);
  }

  emit<T extends EventTypes>(eventType: T): void;
  emit<T extends EventTypes>(eventType: T, data: EventPayloadType[T]): void;
  emit<T extends EventTypes>(eventType: T, data?: EventPayloadType[T]): void {
    if (!this.events.has(eventType)) return;

    const handlers = this.events.get(eventType);
    if (handlers) handlers.forEach((handler) => handler(data));
  }
}
