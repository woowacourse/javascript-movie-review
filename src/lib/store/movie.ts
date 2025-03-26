import { forEach } from '@fxts/core';
import { StrictObject } from '../types';

export class Store<State extends StrictObject = {}> {
  #listeners: (() => void)[] = [];
  #state = {} as State;

  getState(selector: string) {
    return selector ? this.#state[selector] : this.#state;
  }

  setState(nextState: Partial<State>) {
    this.#state = { ...this.#state, ...nextState };
  }

  subscribe(listener: () => void) {
    this.#listeners = [...this.#listeners, listener];
  }

  notify() {
    forEach((listener) => {
      listener();
    }, this.#listeners);
  }
}

export default class MovieStore {
  #store = new Store();
}
