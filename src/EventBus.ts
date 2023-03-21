class EventBus {
  private events: Record<string, CallableFunction> = {};

  setEvent(command: string, event: CallableFunction) {
    this.events[command] = event;
  }

  triggerEvent(command: string) {
    this.events[command]();
  }
}

export default new EventBus();
