import { forEach } from '@fxts/core';
import { MoviesResponse } from '../types';

export default class Store<TState> {
  #listeners: (() => void)[] = [];
  #state = {} as TState;

  constructor(initialState: TState) {
    this.#state = initialState;
  }

  getState() {
    return this.#state;
  }

  setState(nextState: TState) {
    this.#state = { ...this.#state, ...nextState };
    this.notify();
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

export const moviesResponseStore = new Store<MoviesResponse | null>(null);
