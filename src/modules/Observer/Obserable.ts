import { forEach } from '@fxts/core';
import Observer from './Observer';

export default abstract class Obserable<TObserver extends Observer> {
  #observers: TObserver[] = [];

  subscribe(observer: TObserver) {
    this.#observers = [...this.#observers, observer];
  }

  notify() {
    forEach((observer) => {
      observer.update();
    }, this.#observers);
  }
}
