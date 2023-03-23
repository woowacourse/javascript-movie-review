const eventManager = {};

const notify = (event) => {
  eventManager[event.type].forEach((callback) => callback(event));
};

const EventBus = {
  subscribe(eventName, callback) {
    if (!Object.hasOwn(eventManager, eventName)) {
      eventManager[eventName] = [];
      document.addEventListener(eventName, notify);
    }
    eventManager[eventName].push(callback);
  },
};

export default EventBus;
