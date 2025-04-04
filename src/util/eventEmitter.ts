type callbackType = (data?: any) => void;

class EventEmitter {
  events: Record<string, callbackType[]>;

  constructor() {
    this.events = {};
  }

  on(event: string, callback: callbackType) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event: string, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback) => callback(data));
  }

  off(event: string, callback: callbackType) {
    this.events[event] = (this.events[event] || []).filter((cb) => cb !== callback);
  }
}

export const eventEmitter = new EventEmitter();
