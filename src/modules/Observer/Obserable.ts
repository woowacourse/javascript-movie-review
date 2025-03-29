import { forEach } from '@fxts/core';
import Observer from './Observer';

export default abstract class Obserable<TObserver extends Observer<TState>, TState> {
  #observers: TObserver[] = [];

  subscribe(observer: TObserver) {
    this.#observers = [...this.#observers, observer];
  }

  notify(nextState: TState) {
    forEach((observer) => {
      observer.update(nextState);
    }, this.#observers);
  }
}
