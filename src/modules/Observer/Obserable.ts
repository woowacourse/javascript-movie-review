import { forEach } from '@fxts/core';

export default abstract class Obserable<TState> {
  #listeners: ((state: TState) => void)[] = [];

  subscribe(listener: (state: TState) => void) {
    this.#listeners = [...this.#listeners, listener];
  }

  notify(nextState: TState) {
    forEach((listener) => {
      listener(nextState);
    }, this.#listeners);
  }
}
