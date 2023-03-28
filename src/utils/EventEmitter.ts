class EventEmitter extends EventTarget {
  private static instance: EventEmitter;

  private constructor() {
    super();
  }

  static getInstance(): EventEmitter {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }

    return EventEmitter.instance;
  }

  on<T>(eventName: string, callback: (event: CustomEvent<T>) => void) {
    this.addEventListener(eventName, callback as EventListener);
  }

  emit<T>(eventName: string, data?: T) {
    const event = new CustomEvent<T>(eventName, { detail: data });
    this.dispatchEvent(event);
  }
}

export default EventEmitter.getInstance();
