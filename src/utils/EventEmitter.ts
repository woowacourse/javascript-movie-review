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

  on(eventName: string, callback: EventListenerOrEventListenerObject) {
    this.addEventListener(eventName, callback);
  }

  emit(eventName: string, data?: any) {
    const event = new CustomEvent(eventName, { detail: data });
    this.dispatchEvent(event);
  }
}

export default EventEmitter.getInstance();
