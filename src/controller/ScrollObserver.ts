import { debouceFunc } from '../utils';

class ScrollObserver {
  #observer: IntersectionObserver;
  #callBackFun: () => void | Promise<void>;

  constructor(callBackFun: () => void) {
    this.#callBackFun = callBackFun;
    this.#observer = this.#setObserver();
  }

  // observe
  observeTarget($target: Element) {
    this.#observer.observe($target);
  }

  // observer setting
  #setObserver() {
    return new IntersectionObserver(this.#observerCallback, {
      threshold: 1,
    });
  }

  #observerCallback: IntersectionObserverCallback = (entries) => {
    debouceFunc(() => {
      if (entries[0].isIntersecting) {
        this.#callBackFun();
      }
    });
  };
}

export default ScrollObserver;
