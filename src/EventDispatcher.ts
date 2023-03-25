class EventDispatcher {
  private events: Record<string, CallableFunction> = {};

  setEvent(command: string, event: CallableFunction) {
    this.events[command] = event;
  }

  dispatchEvent(command: string, parameters?: unknown[]) {
    parameters ? this.events[command](...parameters) : this.events[command]();
  }
}

export default new EventDispatcher();
