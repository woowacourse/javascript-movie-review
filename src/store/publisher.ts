export type stateType = {
  [key: string]: string | number | boolean;
};

export class publisher {
  [x: string]: any;
  #state: stateType = {};
  // #observers = new Set();

  constructor(state: stateType) {
    this.#state = state;
    Object.keys(state).forEach((key: string) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  change(newState: stateType) {
    this.#state = { ...this.#state, ...newState };
    // this.subscriber_notify();
  }

  getState() {
    return this.#state;
  }

  /*
  subscriber_register(subscriber: unknown) {
    this.#observers.add(subscriber);
  }

  subscriber_notify() {
    this.#observers.forEach((fn: any) => fn());
  }
  */
}
